import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pkg from 'pg';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const { Client } = pkg;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true 
}));

const clientConfig = {
    user: 'postgres',
    password: 'Password123!',
    host: 'localhost',
    port: 5432,
    database:'skillswap_db'
};
const client = new Client(clientConfig);
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection failed:', err));

//BLOCKED
//store refresh token into the database for comparing
// async function storeRefreshToken(token, username) {
//     await client.query(`
//         INSERT INTO refresh_tokens(token, username) VALUES($1, $2)
//         `, [token, username]);
// };

function generateToken(user) {
    return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
};

//BLOCKED
// function generateRefreshToken(user) {
//     return jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
// };

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if(err) return res.status(403).json({ error: 'invalid token data' }); //forbidden
        next();
    });
};

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

app.post('/signin', async(req, res) => {
    try {
        const {username, password} = req.body;
        //Guard clause
        if(!password && !username) {
            res.status(401).json({ message: 'No data' });
            return;
        } else if(!password) {
            res.status(401).json({ message: 'Please enter your password' });
            return;
        } else if(!username) {
            res.status(401).json({ message: 'Please enter your username' });
            return;
        };
        const results = await client.query(
            `
             SELECT * FROM users u WHERE u.username = $1
            `, [username]
        );
        const user = results.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if(!user) { 
            res.status(401).json({ message: 'User name does not exist', authorized: false });
            return;
        } else if(!match) {
            res.status(401).json({ message: 'Incorrect password', authorized: false });
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

app.post('/signout', async(req, res) => {
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
app.get('/profile', authenticateToken, async(req, res) => {
    const selectedUser = req.query.selectedUser;
    try {
        // Return all necessary details for selected matched profile
        const result = await client.query(
            `
            SELECT 
                TO_CHAR(u.created_at, 'YYYY,MON') created_at, 
                u.username,
                u.email,
                u.phone_number,
                u.description,
                ARRAY_AGG(DISTINCT s.name) FILTER (WHERE us.is_learning = true) AS skills_to_learn,
                ARRAY_AGG(DISTINCT s.name) FILTER (WHERE us.is_teaching = true) AS skills_to_teach
            FROM users u
            JOIN users_skills us ON us.user_id = (SELECT id FROM users WHERE username = $1)
            JOIN skills s ON s.id = us.skill_id
            WHERE username = $1
            GROUP BY created_at, u.email, u.phone_number, u.description, u.username
            `, [selectedUser]);
        const profileData = result.rows[0];
        //ensure arrays do not return null
        for(const prop in profileData) {
            if(prop === 'skills_to_learn' || prop === 'skills_to_teach') {
                if(!profileData[prop] || profileData[prop].length === 0) {
                    profileData[prop] = ['No skills to display'];
                };
            };
        };
        console.log(profileData);
        res.status(200).json({ profileData: profileData });
    } catch(err) {
        console.error(err);
    };
});

//fetch all requests associated with a user. Pitched and Recieved
app.get('/fetch-requests', authenticateToken, async(req, res) => {
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

app.listen(4000, () => {
    console.log('listening on port 4000');
});