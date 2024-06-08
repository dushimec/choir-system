import express from 'express';
import { disciplinaryLogin } from '../controllers/AuthoController';
import Validator from '../middleware/Validator';
import verifyToken, { isDisciplinary } from '../middleware/VerifyToken';
import AttendanceController from '../controllers/attendanceController';



const disciplinaryhRouter = express.Router();


disciplinaryhRouter.post('/disciplinary-login',Validator.loginDisciplinary(), Validator.validateInput, disciplinaryLogin);
disciplinaryhRouter.post('/record', verifyToken, isDisciplinary, Validator.recordAttendanceRules(), Validator.validateInput, AttendanceController.markAttendance);
disciplinaryhRouter.post('/send-reports', verifyToken, isDisciplinary, AttendanceController.sendWeeklyReports); 



export default disciplinaryhRouter;
