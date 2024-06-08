// scheduledTasks/attendanceReport.js
import cron from 'node-cron';
import AttendanceService from '../services/attendanceService';

// Schedule to run every Monday at 9 AM
cron.schedule('0 9 * * 1', async () => {
    try {
        await AttendanceService.sendWeeklyReports();
    } catch (error) {
        console.error('Error sending weekly reports:', error);
    }
});
