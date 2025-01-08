import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pkg;
const app = express();
let PORT = 3000;

//config PostgreSQL database
const clientConfig = {
    user: 'postgres',
    password: 'Password123!',
    host: 'localhost',
    port: 5432,
    database:'skillswap_db'
};
const client = new Client(clientConfig);

client
    .connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch((err) => console.error("Connection error", err.stack));

app.use(express.static(path.join(__dirname + './src')));
app.use(cors());
app.use(express.json());

app.get('/fetch-skills', async(req, res) => {
    try {
        const result = await client.query(
            `
            SELECT c.category, ARRAY_AGG(s.name ORDER BY s.name ASC) skills FROM skills s
            JOIN categories_skills cs ON cs.skill_id = s.id
            JOIN categories c ON cs.category_id = c.id
            WHERE cs.category_id = c.id
            AND cs.skill_id = s.id
            GROUP BY c.category ORDER BY c.category     
            `);
            
        if(result.rows.length === 0) {
            res.status(404).json({ error: 'No data' });
            return;
        };

        res.status(200).json({ data: result.rows });
        } catch(err) {
            console.error(err);
        };
});

//fetch all matches
app.get('/matches', async(req, res) => {
    const currentUser = req.query.user;
    try {
        const matches = await client.query(
            `
            SELECT 
                u.username
            FROM users u
            JOIN matches m ON user_id = (SELECT id FROM users WHERE username = $1)
            WHERE m.match_id = u.id
            GROUP BY u.username, u.id
            ORDER BY u.id
            `, [currentUser]
        );
        //send array of matched users as response
        console.log('Matches: ', matches.rows);
        res.status(200).json({ matches: matches.rows })
    } catch(err) {
        console.error(err);
    };
});

// initial mount of all unfiltered profiles
app.post('/', async(req, res) => {
    try {
        const { username } = req.body;
        const learnProfiles = [];
        const teachProfiles = [];
        const safeUsername = username || 'safeUsername';
        const toLearn = await client.query(
            `
            SELECT u.username, ARRAY_AGG(s.name) as to_learn 
            FROM users u
            JOIN users_skills us ON u.id = us.user_id
            JOIN skills s ON s.id = us.skill_id
            LEFT JOIN match_requests mr ON u.id = mr.u_id2 AND mr.u_id1 = (SELECT id FROM users WHERE username = $1)
            WHERE us.is_learning = true 
            AND mr.u_id2 IS NULL
            AND u.username != $1
            GROUP BY u.id
            ORDER BY u.id
            `, [safeUsername]
        );
        //Use 'and mr.u_id2 IS NULL to return all records that are NULL 
        const toTeach = await client.query(
            `
             SELECT u.username, ARRAY_AGG(s.name) to_teach FROM users u
             JOIN users_skills us ON u.id = us.user_id
             JOIN skills s ON s.id = us.skill_id
             LEFT JOIN match_requests mr ON mr.u_id2 = u.id AND mr.u_id1 = (SELECT id FROM users WHERE username = $1)
             WHERE us.is_teaching = true 
             AND u.username != $1   
             AND mr.u_id2 IS NULL
             GROUP BY u.id
             ORDER BY u.id
            `, [safeUsername]
        );
        toTeach.rows.forEach((row) => teachProfiles.push(row));
        toLearn.rows.forEach((row) => learnProfiles.push(row));
        res.status(200).send({ data: {learnProfiles: learnProfiles, teachProfiles: teachProfiles} });
    } catch(err) {
        console.error(err);
    };
});

app.post('/pick-skills', async(req, res) => {
    const data = req.body;
    try {
        const toTeach = data['toTeach'] ? data['toTeach'] : [];
        const toLearn = data['toLearn'] ? data['toLearn'] : [];
        const addedSkills = {
            toLearn: data['toLearn'],
            toTeach: data['toTeach']
        };
        if(data['toTeach'].length == 0 && data['toLearn'] == 0) {
            res.status(404).send({ message: 'No data please select your skills' });
            return;
        };
        let toTeachQueryString = '';
        let toLearnQueryString = '';
        //for each item of the requested array execute an insert query with selected skill
        if(toTeach.length > 0) {
            for(const item of data['toTeach']) {
                toTeachQueryString += `INSERT INTO users_skills (user_id, skill_id, is_learning, is_teaching)
                                    VALUES (
                                    (SELECT users.id FROM users WHERE users.username = '${data.username}'),
                                    (SELECT skills.id FROM skills WHERE skills.name = '${item}'),
                                    true,
                                    false
                                    );`
            };
            await client.query(toTeachQueryString);
        };
        if(toLearn.length > 0) {
            for(const item of data['toLearn']) {
                toLearnQueryString += `INSERT INTO users_skills (user_id, skill_id, is_learning, is_teaching)
                                        VALUES (
                                        (SELECT users.id FROM users WHERE users.username = '${data.username}'),
                                        (SELECT skills.id FROM skills WHERE skills.name = '${item}'),
                                        true,
                                        false
                                        );`
            };
            await client.query(toLearnQueryString);
        };
        res.status(201).json({ message: `Skills updated.`, newSkills: addedSkills });
    } catch(err) {

    };
});

app.post('/register', async(req, res) => {
    try {   
        //Set empty strings to null to let psql know they are null values.
        const data = req.body;
        for(const prop in data) {
            if(data[prop] === '') {
                data[prop] = null;
            }
        };
        //Updated values. PostgreSQL will not create the user if a value is null
        const { username, email, password, confirmPassword} = data;

        const existingUser_Email = await client.query(`
            SELECT * FROM users
            WHERE username = $1
            OR
            email = $2 
        `, [username, email]);

        //Guard clause
        if(password != confirmPassword) {
            res.status(401).send({ message: 'Passwords do not match' });
            return;
        } else if(existingUser_Email.rows.length > 0) {
            res.status(409).json({ message: 'User name or email already exists' });
            return;
        } else if(password === null) { // prevent bcrypt from trying to hash a null value
            res.status(401).json({ message: 'password is required' });
            return;
        };
        
        const hashedPassword = await bcrypt.hash(password, 12);
    
        await client.query(`
            INSERT INTO users(username, email, password)
            VALUES($1, $2, $3)
        `, [username, email, hashedPassword]);

        res.status(201).json({ message: `Welcome to Skill Swap ${username}` });
    } catch(err) {
        console.error('error: ', err.stack);
    }
});

app.post('/fetch-filtered-teach-profiles', async(req, res) => {
    const body = req.body;
    try {
        const { toTeachCategory, toTeach} = body;
        const filters = [];
        const groupBy = [];
        if(toTeachCategory) {
            filters.push(`AND c.category = '${toTeachCategory}'`);
            groupBy.push(`, c.category`);
        };
        if(toTeach) {
            filters.push(`AND s.name = '${toTeach}'`);
            groupBy.push(`, s.name`);
        };
        const results = await client.query(
            `
            SELECT u.username, c.category, ARRAY_AGG(s.name) skills, us.is_teaching FROM users u
            JOIN users_skills us ON us.user_id = u.id
            JOIN skills s ON us.skill_id = s.id
            JOIN categories_skills cs ON cs.skill_id = s.id
            JOIN categories c ON cs.category_id = c.id
            WHERE us.is_teaching = true ${filters.join(' ')}
            GROUP BY u.username, us.is_teaching, us.is_teaching${groupBy.join(' ')}
            ORDER BY u.username
            `
        );
        if(results.rows.length === 0) {
            res.status(404).json({ noData: 'No data' });
            return;
        };
        res.status(200).json({
            profiles: results.rows
        });
    } catch(err) {
        console.error(err);
    };
});

app.post('/fetch-filtered-learn-profiles', async(req, res) => {
    const body = req.body;
    try {
        const { toLearnCategory, toLearn } = body;
        const filters = [];
        const groupBy = [];
        //build sql query around filter values
        if(toLearnCategory) {
            filters.push(`AND c.category = '${toLearnCategory}'`);
            groupBy.push(`, c.category`);
        };
        if(toLearn) {
            filters.push(`AND s.name = '${toLearn}'`);
            groupBy.push(`, s.name`);
        };
        const results = await client.query(
            `
            SELECT u.username, c.category, ARRAY_AGG(s.name) skills, us.is_learning, us.is_teaching FROM users u
            JOIN users_skills us ON us.user_id = u.id
            JOIN skills s ON us.skill_id = s.id
            JOIN categories_skills cs ON cs.skill_id = s.id
            JOIN categories c ON cs.category_id = c.id
            WHERE us.is_learning = true ${filters.join(' ')}
            GROUP BY u.username, us.is_learning, us.is_teaching${groupBy.join(' ')}
            ORDER BY u.username
            `
        );
        if(results.rows.length === 0) {
            res.status(200).json({ message: 'No profiles want to learn ' + toLearn ? toLearn : toLearnCategory });
            return;
        };
        res.status(200).json({
            profiles: results.rows
        });
    } catch(err) {
        console.error(err);
    };
});

app.post('/fetch-quick-filtered-profiles', async(req, res) => {
    const body = req.body;
    try {
        const { category, skill } = body;
        const learnProfiles = [];
        const teachProfiles = [];
        if(skill === undefined && category === undefined) {
            res.status(501).json({ error: 'No skill or category found' });
            return;
        };
        const toTeachMatches = await client.query(
            `
                SELECT u.username, s.name, us.is_teaching, us.is_learning FROM users u
                JOIN users_skills us ON us.user_id = u.id
                JOIN skills s ON us.skill_id = s.id
                WHERE us.is_teaching = true AND s.name = $1
            `, [skill]
        );
        const toLearnMatches = await client.query(
            `
                SELECT u.username, s.name, us.is_teaching, us.is_learning FROM users u
                JOIN users_skills us ON us.user_id = u.id
                JOIN skills s ON us.skill_id = s.id
                WHERE us.is_learning = true AND s.name = $1
            `, [skill]
        );
        if(toTeachMatches.rows.length === 0 && toLearnMatches.rows.length === 0) {
            res.status(200).json({ 
                message: 'No matches found',
                learnProfiles: [], 
                teachProfiles: [], 
            });
            return;
        };
        toTeachMatches.rows.forEach(result => teachProfiles.push(result));
        toLearnMatches.rows.forEach(result => learnProfiles.push(result));
        const filterType = body.headerFilter ? 'header' : 'main';
        res.status(200).json({ 
                data: {...teachProfiles, ...learnProfiles}, 
                learnProfiles: learnProfiles, 
                teachProfiles: teachProfiles, 
                filterType: filterType 
        });
    } catch(err) {
        console.error(err.stack);
    };
});

app.get('/fetch-profile-skills', async(req, res) => {
    const username = req.query.username;
    const toLearnData = {};
    const toTeachData = {};
    try{
        const skillsToLearn = await client.query(
            `
            SELECT ARRAY_AGG(s.name) skills, u.username, us.is_learning FROM skills s
            JOIN users_skills us ON us.user_id = (SELECT u.id FROM users u WHERE username = $1)
            JOIN users u ON u.username = $1
            WHERE us.skill_id = s.id AND us.is_learning
            GROUP BY us.is_learning, u.username
            `, [username]
        );
        const skillsToTeach = await client.query(
            `
            SELECT ARRAY_AGG(s.name) skills, u.username, us.is_teaching FROM skills s
            JOIN users_skills us ON us.user_id = (SELECT u.id FROM users u WHERE username = $1)
            JOIN users u ON u.username = $1
            WHERE us.skill_id = s.id AND us.is_teaching
            GROUP BY us.is_teaching, u.username
            `, [username]
        );
        toLearnData.skills = skillsToLearn.rows[0]?.skills || ['No skills to display'];
        toLearnData.isSkills = skillsToLearn.rows[0]?.skills ? true : false;
        toTeachData.skills = skillsToTeach.rows[0]?.skills || ['No skills to display'];
        toTeachData.isSkills = skillsToTeach.rows[0]?.skills ? true : false;
        res.status(200).json({ 
            toLearn: toLearnData, 
            toTeach: toTeachData
        });
    } catch(err) {
        console.error(err);
    }
});

app.post('/handle-match-request', async(req, res) => {
    const { currentUser, selectedUser, isRequested } = req.body;
    try{

        let query;
        if(!isRequested) {
            //Remove from match_requests table 
            query =         
            `
            DELETE FROM match_requests
            WHERE 
                u_id1 = (SELECT id FROM users WHERE username = $1) 
                AND 
                u_id2 = (SELECT id FROM users WHERE username = $2)
            OR 
                u_id1 = (SELECT id FROM users WHERE username = $2) 
                AND 
                u_id2 = (SELECT id FROM users WHERE username = $1)
            `;
        } else if(isRequested) {
            //Insert into match_requests table
            //Using the rule of UID1 < UID2
            //if u_id1 < u_id2 then u_id1 is the requestor
            query =             
            `
            INSERT INTO match_requests(u_id1, u_id2, requestor)
            VALUES(
                (SELECT id FROM users WHERE username = $1),
                (SELECT id FROM users WHERE username = $2), 
                CASE WHEN (SELECT id FROM users WHERE username = $1) < (SELECT id FROM users WHERE username = $2)
                    THEN 'UID1':: requestor 
                    ELSE 'UID2':: requestor
                END
            )
            `
        };
        await client.query('BEGIN');
        await client.query(query, [currentUser, selectedUser]);
        await client.query('COMMIT');
        res.status(200).json({ message: isRequested ? 'Request sent' : 'Request cancelled' });
    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
    };
});

app.post('/accept-match-request', async(req, res) => {
    const { currentUser, selectedUser } = req.body;
    //Use transactions to handle multiple queries
    try {
        await client.query('BEGIN');
        await client.query(`
            INSERT INTO matches(user_id, match_id) 
            VALUES(
                (SELECT id FROM users WHERE username = $1),
                (SELECT id FROM users WHERE username = $2));
            `, [currentUser, selectedUser]);
        await client.query(`
            INSERT INTO matches(match_id, user_id) 
            VALUES(
                (SELECT id FROM users WHERE username = $1),
                (SELECT id FROM users WHERE username = $2));
            `, [currentUser, selectedUser]);
        //Remove the request from the match_requests table
        await client.query(`
                DELETE FROM match_requests
                WHERE 
                    (u_id1 = (SELECT id FROM users WHERE username = $1) AND u_id2 = (SELECT id FROM users WHERE username = $2))
                OR 
                    (u_id2 = (SELECT id FROM users WHERE username = $1) AND u_id1 = (SELECT id FROM users WHERE username = $2))
            `, [currentUser, selectedUser]);
        await client.query('COMMIT');
        res.status(200).json({ message: 'Match succesful' });
    } catch(err) {
        //undo any changes made to the database if an error is caught
        await client.query('ROLLBACK');
        console.error(err);
    }
});

app.post('/submit-description', async(req, res) => {
    const { description, username } = req.body;
    await client.query(
        `
        UPDATE users
        SET description = $2
        WHERE username = $1
        `, [username, description]);
    res.status(200).json({ message: 'succesfully updated' });
});

//Test token middleware
// app.get('/test-token', authenticateToken, (req, res) => {
//     res.json(users.filter(user => user === req.user));
// });

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
});