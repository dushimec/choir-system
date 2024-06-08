import AttendanceService from '../services/attendanceServise';
import Response from '../helpers/response';
import httpStatus from 'http-status';

class AttendanceController {
    static async markAttendance(req, res) {
        try {
            const { singerId, status, event } = req.body;
            const attendance = await AttendanceService.markAttendance(singerId, status, event);
            return Response.successMessage(res, 'Attendance marked successfully', attendance, httpStatus.OK);
        } catch (error) {
            console.error('Error marking attendance:', error.message);
            return Response.errorMessage(res, 'Error marking attendance', httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    static async sendWeeklyReports(req, res) {
        try {
            await AttendanceService.sendWeeklyReports();
            return Response.successMessage(res, 'Weekly reports sent successfully', {}, httpStatus.OK);
        } catch (error) {
            console.error('Error sending weekly reports:', error.message);
            return Response.errorMessage(res, 'Error sending weekly reports', httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export default AttendanceController;
