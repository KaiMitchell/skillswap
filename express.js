import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pool } from 'pg';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname + './src')));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ data: 'Hello, world!!!' });
});

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
});