import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pkg;
const app = express();
let PORT;

if(process.env.NODE_ENV === 'production') {
    PORT = process.env.DEV_PORT
} else {
    PORT = process.env.PROD_PORT;
};

let clientConfig;

if(process.env.NODE_ENV === "production") {
    clientConfig = {
        connectionString: process.env.POSTGRESURI
    }
} else {
    clientConfig = {
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD,
        host: 'localhost',
        port: 5432,
        database:'skillswap_db'
    }
};

const client = new Client(clientConfig);

client
    .connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch((err) => console.error("Connection error", err.stack));

app.use(express.static(path.join(__dirname + './src')));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ data: 'Hello, world!!!' });
});

// app.get('/sign-in', (req, res) => {
//     res.status(200).send({ title: 'Hello, world!!!' });
// });

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
});