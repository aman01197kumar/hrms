import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userroute } from './routes/user.routes.js';
import { taskroute } from './routes/task.route.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
// Serve uploaded files statically
import path from 'path';
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI
try{
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
} catch (error) {
  console.error('MongoDB connection error:', error);
}


app.use('/users', userroute);
app.use('/tasks', taskroute);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
