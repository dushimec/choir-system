import 'dotenv/config';
import Response from '../helpers/response';
import httpStatus from 'http-status';
import { User } from '../models/user.model';
import { Singer } from '../models/singer';
import TokenAuthenticator from '../helpers/TokenAuthenticator';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'] || req.params['token'] || req.query['token'];
        if (!token) {
            console.log('No token found in headers or query parameters');
            return Response.errorMessage(res, "No token found", httpStatus.NOT_FOUND);
        }
     
        console.log('Token received:', token);

        const payload = TokenAuthenticator.decodeToken(token);
        if (!payload) {
            return Response.errorMessage(res, "Unauthorized, invalid token", httpStatus.UNAUTHORIZED);
        }

        console.log('Decoded token payload:', payload);

        let validUser = await User.findOne({ _id: payload._id });
        if (!validUser) {
            validUser = await Singer.findOne({ _id: payload._id });
        }

        if (!validUser) {
            console.log('No valid user found for payload _id:', payload._id);
            return Response.errorMessage(res, "You're not authorized!", httpStatus.UNAUTHORIZED);
        }

        req.user = {
            _id: validUser._id,
            role: validUser.role || 'singer',
            isAdmin: validUser.isAdmin || false,
            name: validUser.name,
            phone: validUser.phone,
            email: validUser.email || '',
        };

        req.token = token;
        next();
    } catch (error) {
        console.error('Error during token verification:', error);
        return Response.errorMessage(res, "You cannot proceed without setting a valid token", httpStatus.INTERNAL_SERVER_ERROR);
    }
};

const checkRole = (roles) => (req, res, next) => {
    try {
        if (!roles.includes(req.user.role) && !req.user.isAdmin) {
            return Response.errorMessage(res, "You are not authorized to access this resource", httpStatus.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        console.error('Error during role checking:', error);
        return Response.errorMessage(res, "An error occurred while checking user role", httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export const isSinger = checkRole(['singer']);
export const isSecretary = checkRole(['secretary']);
export const isDisciplinary = checkRole(['disciplinary']);
export const isAdmin = checkRole(['admin']);
export default verifyToken;
