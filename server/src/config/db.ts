import mongoose from 'mongoose';
import { envConfig } from './env-config';

export const connectDB = async (): Promise<void> => {
  try {
    if (!envConfig.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(envConfig.MONGO_URI, {
      dbName: envConfig.DB_NAME || 'inv-db',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occurred while connecting to MongoDB');
    }
  }
};
