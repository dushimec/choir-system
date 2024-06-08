import express from 'express';
import { loginSingerController } from '../controllers/singerController';





const authRouter = express.Router();



authRouter.post('/singer-login', loginSingerController);


export default authRouter;
