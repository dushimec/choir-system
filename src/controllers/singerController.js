import { loginSinger, registerSinger } from '../services/singerService';
import Response from '../helpers/response';
import httpStatus from 'http-status';

const registerNewSinger = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const singer = await registerSinger({ name, phone });

        res.status(201).json({
            status: 'success',
            message: `Singer ${singer.name} registered successfully`,
            data: singer,
        });
    } catch (error) {
        return Response.errorMessage(res, 'An error occurred while registering the singer', httpStatus.INTERNAL_SERVER_ERROR);
    }
};

const loginSingerController = async (req, res) => {
    try {
        const { phone } = req.body;
        const { token, user } = await loginSinger(phone);

        return res.status(200).json({
            status: 'success',
            token,
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                role: 'singer',
            },
        });
    } catch (error) {
        console.error('Error during singer login:', error.message);
        return Response.errorMessage(res, error.message, httpStatus.UNAUTHORIZED);
    }
};

export { registerNewSinger,loginSingerController };
