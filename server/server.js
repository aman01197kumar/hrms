import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userroute } from './routes/user.routes.js';
import { taskroute } from './routes/task.route.js';
import path from 'path';
import { dbConnect } from './config/dbConfig.js';
dotenv.config();


const app = express();

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 3001;

dbConnect()

app.use('/users', userroute);
app.use('/tasks', taskroute);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
