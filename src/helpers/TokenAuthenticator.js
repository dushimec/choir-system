import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class TokenAuthenticator {
    static tokenGenerator(data) {
        const token = jwt.sign(data, process.env.JWT_SECRET);
        return token;
    }

    static decodeToken(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload;
        } catch (error) {
            console.error('Token verification error:', error);
            return null;
        }
    }

    static signToken(data) {
        const token = jwt.sign(data, process.env.JWT_SECRET);
        return token;
    }
}
