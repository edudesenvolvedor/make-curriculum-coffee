import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export default async (): Promise<void> => {
  try {
    const URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    console.log(URI);
    await mongoose.connect(URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
};
