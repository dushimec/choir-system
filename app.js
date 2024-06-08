
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './src/config';
import cookiePasrser from 'cookie-parser'

// import userRouter from './src/routers/user.routes';
import authRouter from './src/routers/singer.routes';
import secretaryRouter from './src/routers/secretary.routes';
import disciplinaryhRouter from './src/routers/disciplinary.routes';
import adminRouter from './src/routers/admin.routes';

// import userLoginrouter from './src/routers/auth.routes';
// import singerLoginrouter from './src/routers/singerAuth.routes';
// import attendanceRouter from './src/routers/attendence.routes';

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;



app.use(bodyParser.json());
app.use(cors());
app.use(cookiePasrser())


// app.use('/user',userRouter)
app.use('/auth/singer', authRouter)
app.use('/auth/secretary', secretaryRouter)
app.use('/auth/disciplinary', disciplinaryhRouter)
app.use('/admin', adminRouter)


app.use((err,res,req,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
