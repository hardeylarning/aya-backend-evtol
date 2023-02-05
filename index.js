import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { dBConnection } from './config/db-connect.js';

dotenv.config();
dBConnection();

const port = process.env.PORT || 9000;
const app = express();

app.use(cors())

app.use(express.json())

app.use("/api/v1/users", "")



app.listen(port, () => console.log(`Server is running at ${port}`))