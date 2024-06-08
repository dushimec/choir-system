import { Attendance } from '../models/attendence.model';
import { Singer } from '../models/singer';
import twilio from 'twilio';
import 'dotenv/config';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

class AttendanceService {
    static async markAttendance(singerId, status, event) {
        try {
            const attendance = new Attendance({
                singer: singerId,
                status,
                event,
            });

            await attendance.save();
            return attendance;
        } catch (error) {
            console.error('Error marking attendance:', error.message);
            throw new Error('Error marking attendance');
        }
    }

    static async sendWeeklyReports() {
        try {
            const fourWeeksAgo = new Date();
            fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

            const singers = await Singer.find({});
            for (const singer of singers) {
                try {
                    const lastAttendance = await Attendance.findOne({ singer: singer._id }).sort({ date: -1 });
                    let message;
                    if (lastAttendance && lastAttendance.date >= fourWeeksAgo) {
                        message = `Hello ${singer.name}, you were marked as ${lastAttendance.status} for the event ${lastAttendance.event}.`;
                    } else {
                        message = `Hello ${singer.name}, you have missed several sessions. Please check your attendance report.`;
                    }
                    
                    await client.messages.create({
                        body: message,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: singer.phone
                    });
                } catch (smsError) {
                    console.error(`Error sending message to ${singer.phone}:`, smsError.message);
                }
            }
        } catch (error) {
            console.error('Error sending weekly reports:', error.message);
            throw new Error('Error sending weekly reports');
        }
    }
}

export default AttendanceService;
