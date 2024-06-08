import { Router } from "express";
import {  getUsers, registerUser } from "../controllers/userController";
import Validator from "../middleware/Validator";
import verifyToken, { isAdmin } from "../middleware/VerifyToken";
import { adminLogin } from "../controllers/AuthoController";
const adminRouter = Router()

adminRouter.post('/register', registerUser, Validator.newAccountRules(), Validator.validateInput)
adminRouter.post('/register-managers',verifyToken, isAdmin, Validator.newAccountRules(), Validator.validateInput, registerUser)
adminRouter.post('/admin-login',Validator.loginAdmin(), Validator.validateInput, adminLogin)
adminRouter.patch('/assign-role', verifyToken, isAdmin, ) 
adminRouter.get('/users', verifyToken, isAdmin, getUsers);

export default adminRouter;