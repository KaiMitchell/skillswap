import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pkg;
const app = express();
let PORT = 3000;

//config PostgreSQL database
const clientConfig = {
    user: 'myuser',
    password: 'Password123!',
    host: 'localhost',
    port: 5432,
    database:'skillswap_db'
}
const client = new Client(clientConfig);

client
    .connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch((err) => console.error("Connection error", err.stack));

app.use(express.static(path.join(__dirname + './src')));
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    const test = await client.query(`SELECT * FROM users`);
    console.log(test);

    res.status(200).send({ data: 'Hello, world!!!' });
});

app.post('/pick-skills', async(req, res) => {
    const data = req.body;
    let toTeachString = data['toTeach'].join("', '");
    let toLearnString = data['toLearn'].join("', '");

    //Clean the table for production purposes
    await client.query(`TRUNCATE TABLE users_skills CASCADE`);
    //Reset serial id count
    await client.query(`SELECT setval('users_skills_id_seq', 1, false)`);

    if(data['toTeach'] == [] && data['toLearn'] == []) {
        res.status(404).send({ message: 'No data please select your skills' });
        return;
    };

    if(data['toTeach'].length > 0) {
        await client.query(
            `INSERT INTO users_skills (user_id, skill_to_teach_id)
             SELECT users.id, skills.id
             FROM users, skills WHERE users.username = '${data.username}'
             AND skills.name IN ('${toTeachString}')`
        );
    };

    if(data['toLearn'].length > 0) {
        await client.query(
            `INSERT INTO users_skills (user_id, skill_to_learn_id)
             SELECT users.id, skills.id
             FROM users, skills WHERE users.username = '${data.username}'
             AND skills.name IN ('${toLearnString}')`
        );
    };

    const newSkills = await client.query(
        `SELECT name FROM skills
         WHERE name IN ('${toLearnString}', '${toTeachString}')`
    );

    console.log(newSkills);

    res.status(201).json({ message: `Skills updated.` });
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

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
});