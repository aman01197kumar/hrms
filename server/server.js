import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { userroute } from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI
try{
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
} catch (error) {
  console.error('MongoDB connection error:', error);
}


app.use('/users', userroute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
