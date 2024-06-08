import express from 'express';
import { secretaryLogin } from '../controllers/AuthoController';
import verifyToken, { isSecretary } from '../middleware/VerifyToken';
import { registerNewSinger, } from '../controllers/singerController';
import Validator from '../middleware/Validator';



const secretaryRouter = express.Router();



secretaryRouter.post('/secretary-login',Validator.loginSecretary(), Validator.validateInput, secretaryLogin);
secretaryRouter.post('/add-singer', verifyToken,isSecretary, Validator.newSingerRoules(),Validator.validateInput, registerNewSinger);


export default secretaryRouter;
