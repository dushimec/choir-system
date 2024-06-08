import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Phone number is required"],
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin','disciplinary', 'secretary', 'singer'],
        default: 'singer',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };
