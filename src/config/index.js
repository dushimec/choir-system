
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  
 mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: false
 })
 .then(() => console.log('MongoDB connected successfully'))
 .catch((error)=> console.error('Failed to connect to database',error))
    
 
};

export { connectDB };
