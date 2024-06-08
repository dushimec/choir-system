import { User } from '../models/user.model';
import { Singer } from '../models/singer';
import bcrypt from 'bcrypt';
import TokenAuthenticator from '../helpers/TokenAuthenticator';




const createUser = async (userData, registeredBy) => {
    const { name, email, phone, password, role } = userData;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        throw new Error('User with this email or phone number already exists');
    }

    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        role
    });

    await newUser.save();

    if (role === 'singer' && registeredBy.role === 'secretary') {
        const newSinger = new Singer({ name, phone });
        await newSinger.save();
    }

    return newUser;
};




const updateUser = async (userId, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return user;
};

const authenticateUser = async (emailOrPhone, password) => {
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) {
        throw new Error('Invalid email/phone or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email/phone or password');
    }

    const token = TokenAuthenticator.signToken({ _id: user._id, role: user.role, isAdmin: user.isAdmin });
    return { user, token };
};

export { createUser, updateUser, authenticateUser };
