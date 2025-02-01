import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  mongoose.set('strictQuery', true)
  if (initialized) {
    console.log('Already Connected to Database')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'blog-template', // Change to Project Database Name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Database')
    initialized = true;
  } catch (error) {
    console.log("Error Connecting to Database ", error)
  }
}