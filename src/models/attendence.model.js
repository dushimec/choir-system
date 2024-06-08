import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    singer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true,
    },
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export { Attendance };
