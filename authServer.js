import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pkg from 'pg';
import fileUpload from 'express-fileupload';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticFilePath = process.env.DATABASE_URI === 'production' ? './dist' : '/src';

const app = express();
const { Client } = pkg;
let clientConfig = {};

app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(fileUpload());
app.use(express.static('assets'));
app.use(express.static(path.join(__dirname + staticFilePath)));

if(process.env.NODE_ENV === 'production') {
    clientConfig = { connectionString: process.env.DATABASE_URI };
} else {
    clientConfig = {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: 5432,
        database: process.env.PGDATABASE,
        ssl: true
    };
};
const client = new Client(clientConfig);
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection failed:', err));

function generateToken(user) {
    return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if(err) return res.status(403).json({ error: 'invalid token data' }); //forbidden
        next();
    });
};

//fetch all skills that current user has not already selected
app.get('/api/unselected-skills', async(req, res) => {
    const { username } = req.query;

    try {
        const result = await client.query(
            `
            SELECT
                c.category, 
                ARRAY_AGG(s.name ORDER BY s.name ASC) skills 
            FROM 
                categories c
            JOIN 
                categories_skills cs ON cs.category_id = c.id
            JOIN 
                skills s ON cs.skill_id = s.id  
            WHERE 
                s.id NOT IN (
                    SELECT skill_id
                    FROM users_skills
                    WHERE user_id = (SELECT id FROM users WHERE username = $1)
                )
            GROUP BY c.category 
            ORDER BY c.category     
            `, [username]);
            
        if(result.rows.length === 0) {
            res.status(404).json({ error: 'No data' });
            return;
        };

        res.status(200).json({ data: result.rows });
        } catch(err) {
            console.error(err);
        };
});

//delete a skill from skills list
//whether the skill is to learn or teach does not matter
//their can only be one instance of a skill assign to a user
app.delete('/api/remove-skill', async(req, res) => {
    const { username, skill} = req.query;

    try{

        let beforeCount;
        let afterCount;

        const countBeforeAdd = await client.query(`
            SELECT COUNT(user_id)
            FROM users_skills 
            WHERE user_id = (SELECT id FROM users WHERE username = $1)`
        , [username]);

        //remove selected skill for current user from users_skills junction table
        await client.query(
            `
            DELETE FROM 
                users_skills 
            WHERE 
                skill_id = (SELECT id FROM skills WHERE name = $1)
            AND 
                user_id = (SELECT id FROM users WHERE username = $2)
            `, [skill, username]
        );

        const countAfterAdd = await client.query(`
            SELECT COUNT(user_id)
            FROM users_skills 
            WHERE user_id = (SELECT id FROM users WHERE username = $1)`
        , [username]);
        
        //if before and after count are equal then no skill was deleted and something went wrong
        beforeCount = countBeforeAdd.rows[0].count;
        afterCount = countAfterAdd.rows[0].count;

        if(beforeCount === afterCount) {
            res.status(500).json({ message: 'something went wrong' });
            return;
        };

        res.status(200).json({ 
            message: 'deletion succesful',
            rowCount: afterCount
        });

    } catch(err) {
        console.log('error removing skill: ', err);
    };
});

//add a new skill to the users skill list
app.post('/api/add-skill', async(req, res) => {

    const { skill, username, toLearn } = req.body;

    try{
        let lengthBefore;
        let lengthAfter;

        const resultBeforeAdd = await client.query(`
            SELECT COUNT(user_id)
            FROM users_skills 
            WHERE user_id = (SELECT id FROM users WHERE username = $1)`
        , [username]);

        // insert selected skill into users_skills junction table 
        await client.query(
            `
            INSERT INTO users_skills (user_id, skill_id, is_learning, is_teaching)
            VALUES (
                (SELECT id FROM users WHERE username = $1),
                (SELECT id FROM skills WHERE name = $2),
                $3,
                $4
            )
            `, [username, skill, toLearn, !toLearn]
        );

        const resultAfterAdd = await client.query(`
            SELECT COUNT(user_id)
            FROM users_skills 
            WHERE user_id = (SELECT id FROM users WHERE username = $1)`
        , [username]);

        lengthBefore = resultBeforeAdd.rows[0].count;
        lengthAfter = resultAfterAdd.rows[0].count;

        // if length before and after variables are equal to eachother than something went wrong
        if(lengthBefore === lengthAfter) {
            res.status(500).json({ message: 'query did not execute' });
            return;
        };

        //useLengthAfter to make re render states value more unique
        res.status(200).json({ 
            message: `'${skill}' has been added to your list`,
            rowCount: lengthAfter
        });
    } catch(err) {
        console.error('Error adding skill: ', err);
    };
});

//create a new user
app.post('/api/register', async(req, res) => {

    const data = req.body;

    try {   
        
        //initialize error object to store 409 conflict statuses
        let newErrors = {};

        //Set empty strings to null to let psql know they are null values.
        for(const prop in data) {
            if(data[prop] === '') {
                data[prop] = null;
            }
        };

        //Updated values. PostgreSQL will not create the user if a value is null
        const { username, email, password } = data;

        //check db for existing username
        const existingUser = await client.query(`

            SELECT * FROM users
            WHERE username = $1

        `, [username]);

        //check db for existing email
        const existingEmail = await client.query(`

            SELECT * FROM users
            WHERE email = $1 

        `, [email]);

        if(existingUser.rows.length > 0) newErrors.username = 'Username already exists';
        if(existingEmail.rows.length > 0) newErrors.email = 'Email already exists';

        if(Object.keys(newErrors).length > 0) {
            res.status(409).json({ newErrors });
            return;
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        //insert new user into postgreSQL database
        await client.query(`
            INSERT INTO users(username, email, password)
            VALUES($1, $2, $3)
        `, [username, email, hashedPassword]);

        //generate access token to pass to client side
        const accessToken = generateToken(username);

        res.status(201).json({ 
            message: `Welcome to Skill Swap ${username}`,
            accessToken: accessToken,
            username: username
        });

    } catch(err) {
        console.error('error: ', err.stack);
    }
});

//login
app.post('/api/signin', async(req, res) => {

    const { username, password } = req.body;

    try {

        //initialize error object to store incorrect data errors
        let newErrors = {};
    
        //retrieve requested username from the postgreSQL db
        const existingUser = await client.query(
            `
             SELECT * FROM users u WHERE u.username = $1
            `, [username]
        );

        const user = existingUser.rows[0];

        if(!user) {
            newErrors.username = 'Incorrect username';
        } else {
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                newErrors.password = 'Incorrect password';
            };
        };

        console.log(newErrors)
        if(Object.keys(newErrors).length > 0) {
            res.status(401).json({ newErrors });
            return;
        };  

        await client.query(
            `
            SELECT ARRAY_AGG(DISTINCT username) sent_requests FROM users u
            JOIN match_requests mr ON mr.u_id1 = (SELECT id FROM users WHERE username = $1)
            WHERE mr.u_id2 = u.id
            `, [username]
        );

        //generate access token and store refresh token in an httpOnly cookie
        const accessToken = generateToken(username);

        //BLOCKED
        // const refreshToken = generateRefreshToken(username);
        // await storeRefreshToken(refreshToken, username);
        //assign refresh token
        // res.cookie('refreshToken', refreshToken, { 
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: 'None',
        //     path: '/'
        // });
        //send user details and access token in response

        res.status(200).json({ ...user, accessToken: accessToken });
    } catch(err) {
        console.error('error!: ', err);
    };
});

//logout
app.post('/api/signout', async(req, res) => {
    //BLOCKED
    // const token = req.cookies.refreshToken;
    try{

        //BLOCKED
        //Remove refresh token from db
        // await client.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
        // res.clearCookie('refreshToken');

        res.status(204).send();
    } catch(err) {
        console.err('sign out error: ', err);
        res.status(500).json({ error: 'internal server error' });
    };
});

//get matched profile data
app.get('/api/profile', authenticateToken, async(req, res) => {
    const selectedUser = req.query.selectedUser;

    try {
        // Return all necessary details for selected matched profile
        const result = await client.query(
            `
            SELECT 
                TO_CHAR(u.created_at, 'YYYY,MON') created_at, 
                u.username,
                u.email,
                u.profile_picture,
                u.phone_number,
                u.description,
                COALESCE(ARRAY_AGG(DISTINCT s.name) FILTER (WHERE us.is_learning = true), ARRAY['No skills to teach']) AS skills_to_learn,
                COALESCE(ARRAY_AGG(DISTINCT s.name) FILTER (WHERE us.is_teaching = true), ARRAY['No skills to teach']) AS skills_to_teach
            FROM users u
            LEFT JOIN users_skills us ON us.user_id = (SELECT id FROM users WHERE username = $1)
            LEFT JOIN skills s ON s.id = us.skill_id
            WHERE username = $1
            GROUP BY 
                created_at, 
                u.email, 
                u.profile_picture,
                u.phone_number, 
                u.description, 
                u.username
        `, [selectedUser]);

        //return all platform links associated with the selected user
        const socials = await client.query(`
            SELECT platform, url FROM social_links
            WHERE user_id = (SELECT id FROM users WHERE username = $1)
            `, [selectedUser]
        );

        const profileData = result.rows[0];

        //ensure arrays do not return null
        for(const prop in profileData) {
            if(prop === 'skills_to_learn' || prop === 'skills_to_teach') {
                if(!profileData[prop] || profileData[prop].length === 0) {
                    profileData[prop] = ['No skills to display'];
                };
            };
        };

        //append  socials results to response body inside the socials key
        res.status(200).json({ profileData: { ...profileData, socials: socials.rows } });
    } catch(err) {
        console.error(err);
    };
});

//fetch all requests associated with a user. Pitched and Recieved
app.get('/api/fetch-requests', authenticateToken, async(req, res) => {
    const username = req.query.user;
    try{
        const sentRequests = []; 
        const recievedRequests = []; 
        const userIdQuery = await client.query(`SELECT id FROM users WHERE username = $1`, [username]);
        if (userIdQuery.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        };
        const userId = userIdQuery.rows[0].id;
        const sentRequestsQuery = await client.query(
            `
            SELECT ARRAY_AGG(DISTINCT username) FROM users u
            JOIN match_requests mr ON mr.u_id1 = $1
            WHERE mr.u_id2 = u.id
            `, [userId]
        );
        const recievedRequestsQuery = await client.query(
            `
            SELECT ARRAY_AGG(DISTINCT username) FROM users u
            JOIN match_requests mr ON mr.u_id2 = $1
            WHERE mr.u_id1 = u.id
            `, [userId]
        );
        //push the query results into array for readability and passing into res data
        if(sentRequestsQuery.rows[0].array_agg) {
            sentRequests.push(...sentRequestsQuery.rows[0].array_agg);
        };
        if(recievedRequestsQuery.rows[0].array_agg) {
            recievedRequests.push(...recievedRequestsQuery.rows[0].array_agg);
        };
        res.status(200).json({ 
            sentRequests: sentRequests,
            recievedRequests: recievedRequests
         });
    } catch(err) {
        console.error(err);
    };
});

app.post('/api/unmatch', authenticateToken, async(req, res) => {
    const { selectedUser, user } = req.body;
    console.log(selectedUser + ' ' + user);
    try {
        // delete relationship between the 2 selected users from the matches table
        await client.query(
            `
            DELETE FROM matches 
            WHERE 
                (user_id = (SELECT id FROM users WHERE username = $1)
                AND 
                match_id = (SELECT id FROM users WHERE username = $2))
            OR  
                (user_id = (SELECT id FROM users WHERE username = $2)
                AND 
                match_id = (SELECT id FROM users WHERE username = $1))
            `, [selectedUser, user]
        );

        //check if deletion fired
        const results = await client.query(
            `
            SELECT * FROM matches
            WHERE 
                (user_id = (SELECT id FROM users WHERE username = $1)
                AND 
                match_id = (SELECT id FROM users WHERE username = $2))
            OR  
                (user_id = (SELECT id FROM users WHERE username = $2)
                AND 
                match_id = (SELECT id FROM users WHERE username = $1))
            `, [selectedUser, user]
        );

        if(results.rows.length > 0) {
            res.sendStatus(404);
            return;
        };

        res.status(200).json({ message: 'deleted' });
    } catch(err) {
        console.error(err)
    };
});

app.post('/api/edit-profile', async(req, res) => {
    const {
        currentUsername,
        newUsername,
        newDescription,
        linkToPlatform,
        platform,
    } = req.body;

    console.log(req.body);

    try { 
        let imgFile;
        let imgPath;
        let uploadPath;
        //array to dynamically build update queries
        let usersUpdates = [];

        //check if new username is already in use
        const existingUsername = await client.query(
            `
            SELECT * FROM users WHERE username = $1
            `, [newUsername || '']
        );

        //prevent conflicting usernames
        if(existingUsername.rows.length > 0) {
            res.status(409).json({ message: `Username of: ${newUsername} already exists`});
            return;
        };

        if(platform) {
            const exsistingPlatform = await client.query(`
                SELECT * FROM social_links WHERE platform = $1 AND user_id = (SELECT id FROM users WHERE username = $2)
                `, [platform, currentUsername]
            );
    
            //make an insert if there is no link to platform
            if(exsistingPlatform.rows.length === 0) {
                console.log('inserting into social_links table: ', platform, linkToPlatform);
                await client.query(`
                    INSERT INTO social_links(user_id, platform, url)
                    VALUES(
                        (SELECT id FROM users WHERE username = $1),
                        $2,
                        $3 
                    );
                `, [currentUsername, platform, linkToPlatform]);
            };
        
            //if the user has a link pointing to an existing platform then update the platforms link
            if(exsistingPlatform.rows.length > 0) {
                await client.query(
                    `UPDATE social_links
                     SET url = $1
                     WHERE user_id = (SELECT id FROM users WHERE username = $2)
                     AND platform = $3
                    `, [linkToPlatform, currentUsername, platform]
                );
            };
        };

        if(req.files && req.files.imgFile) {
            imgFile = req.files.imgFile;
            imgPath = Date.now() + imgFile.name;
            //define path to move file to
            //use date dot now to prevent conflicting file names
            uploadPath = __dirname + '/assets/' + imgPath;
        
            //use mv to place the file into my assets folder
            imgFile.mv(uploadPath, (err) => {
                if(err) {
                    res.status(500).json({ error: err });
                    return;
                };
            });
    
            //set update query to add img url into database
            usersUpdates.push(`profile_picture = '${imgPath}'`);
        };
    
        //updates for users table
        newUsername ? usersUpdates.push(`username = '${newUsername}'`) : usersUpdates.push(`username = $1`);
        newDescription && usersUpdates.push(`description = '${newDescription}'`);
    
        //if no file is uploaded select the current profile picture to return.
        //to prevent no picture being displayed.
        let currentProfilePicture;
    
        if(!req.files || !req.files.imgFile) {
            const result = await client.query(`SELECT profile_picture FROM users WHERE username = $1`, [currentUsername]);
            currentProfilePicture = result.rows[0]?.profile_picture || '';
        };
    
        //apply updated data to user
        await client.query(        
            `
            UPDATE users
            SET ${usersUpdates.join(', ')}
            WHERE username = $1
            `, [currentUsername]
        );

        const newSocials = await client.query(
            `SELECT * FROM social_links WHERE user_id = (SELECT id FROM users WHERE username = $1)`, [currentUsername]
        );
        console.log(newSocials.rows);
    
        res.json({ 
            img: `http://localhost:3000/${imgPath ? imgPath : currentProfilePicture}`,
            newSocials: newSocials.rows,
            newUsername: newUsername || currentUsername          
        });
    } catch(err) {
        console.error(err);
    };
});

app.put('/api/update-priority-skill', async(req, res) => {
    const {
        user,
        skill,
        isToLearn, //determines if setting a priority skill to learn or teach
    } = req.body;
    
    try {
        const priorityType = isToLearn ? 'skill_to_learn_priority_id' : 'skill_to_teach_priority_id';

        await client.query(
            `UPDATE users_skills
             SET ${priorityType} = (SELECT id FROM skills WHERE name = $2)
             WHERE user_id = (SELECT id FROM users WHERE username = $1)`, [user, skill]
        );

        res.status(200).json({ message: 'successfully updated' });
    } catch(err) {
        console.error(err);
    };
});

app.delete('/api/unprioritize-skill', async(req, res) => {
    const { user, skill, isToLearn } = req.body;
    try {
        const priorityType = isToLearn ? 'skill_to_learn_priority_id' : 'skill_to_teach_priority_id';
        await client.query(
            `UPDATE users_skills
             SET ${priorityType} = NULL
             WHERE user_id = (SELECT id FROM users WHERE username = $1)`, [user]
        );
        res.status(200).json({ message: skill + 'unprioritized' })
    } catch(err) {
        console.error(err);
    };
});

app.delete('/api/remove-all-match-requests', async(req, res) => {
    const username = req.query.username;
    try {
        await client.query(
            `
            DELETE FROM match_requests 
            WHERE u_id1 = (SELECT id FROM users WHERE username = $1)
            `, [username]
        );
        res.status(200).json({ message: 'removed all sent requests' });
    } catch(err) {
        console.error(err);
    };
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});


//BLOCKED
// function generateRefreshToken(user) {
//     return jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
// };


//BLOCKED
//store refresh token into the database for comparing
// async function storeRefreshToken(token, username) {
//     await client.query(`
//         INSERT INTO refresh_tokens(token, username) VALUES($1, $2)
//         `, [token, username]);
// };



//BLOCKED
//end point to renew access token with refresh token
// app.post('/token', async(req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     console.log(refreshToken);
//     if(!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });
//     try {
//         const results = await client.query(`SELECT * FROM refresh_tokens WHERE token = $1`, [refreshToken]);
//         if(results.rows.length === 0) return res.status(403).json({ message: 'Invalid refresh token' });
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
//             if(err) return res.status(403).json({ message: 'Invalid refresh token' });
//             const newAccessToken = generateToken(payload.user);
//             res.status(200).json({ accessToken: newAccessToken });
//         });
//     } catch(err) {
//         console.error('token refresh error: ', err);
//         res.status(500).json({ error: 'internal server error' });
//     };
// });
