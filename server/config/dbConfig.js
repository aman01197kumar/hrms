import mongoose from "mongoose";

export const dbConnect = async () => {
    const MONGO_URI = process.env.MONGO_URI
    try{
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
    
}