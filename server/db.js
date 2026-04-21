import mongoose from 'mongoose';

/**
 * Connects the API server to MongoDB using DATABASE_URL.
 */
export const connectToDatabase = async () => {
  const mongoUri = process.env.DATABASE_URL;

  if (!mongoUri) {
    console.warn('⚠️  DATABASE_URL missing. Server will run with In-Memory Mock Database (data will be lost on restart).');
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB. Falling back to Mock Database:', error.message);
    return false;
  }
};
