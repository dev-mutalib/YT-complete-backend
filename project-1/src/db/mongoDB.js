import mongoose from 'mongoose';

const connectDB = async (MONGO_URI) => {
  try {
    console.log(`Waiting for DB connection...`);

    const instance = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected successfully`);
    console.log(`${instance.connection.db.namespace} Database is avaliable`);
  } catch (error) {
    console.log(error);
  }
};


export default connectDB