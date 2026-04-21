import mongoose from 'mongoose';

/**
 * Connects the API server to MongoDB using DATABASE_URL.
 */
export const connectToDatabase = async () => {
  const mongoUri = process.env.DATABASE_URL;

  if (!mongoUri) {
    throw new Error('Missing DATABASE_URL environment variable');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
