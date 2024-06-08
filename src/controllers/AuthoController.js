import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import Response from '../helpers/response';
import TokenAuthenticator from '../helpers/TokenAuthenticator';
import httpStatus from 'http-status';


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.isAdmin) {
            return Response.errorMessage(res, "Invalid email or not an admin", httpStatus.UNAUTHORIZED);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.errorMessage(res, "Invalid password", httpStatus.UNAUTHORIZED);
        }

        const token = TokenAuthenticator.signToken({ _id: user._id, isAdmin: user.isAdmin });
        return Response.successMessage(res, "Login successful", { token, user }, httpStatus.OK);
    } catch (error) {
        return Response.errorMessage(res, "Error logging in", httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const disciplinaryLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.role !== 'disciplinary') {
            return Response.errorMessage(res, "Invalid email or role", httpStatus.UNAUTHORIZED);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.errorMessage(res, "Invalid password", httpStatus.UNAUTHORIZED);
        }

        const token = TokenAuthenticator.signToken({ _id: user._id, role: user.role, name: user.name });
        res.status(200).json({
            status: 'success',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return Response.errorMessage(res, "An error occurred while authenticating", httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const secretaryLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.role !== 'secretary') {
            return Response.errorMessage(res, "Invalid email or role", httpStatus.UNAUTHORIZED);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.errorMessage(res, "Invalid password", httpStatus.UNAUTHORIZED);
        }

        const token = TokenAuthenticator.signToken({ _id: user._id, role: user.role, name: user.name });
        res.status(200).json({
            status: 'success',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return Response.errorMessage(res, "An error occurred while authenticating", httpStatus.INTERNAL_SERVER_ERROR);
    }
};
