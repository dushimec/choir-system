import { createUser, updateUser, authenticateUser } from '../services/userService';
import { User } from '../models/user.model';
import Response from '../helpers/response';
import httpStatus from 'http-status';


const registerUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body, req.user);
        return Response.successMessage(res, 'User registered successfully', newUser, httpStatus.CREATED);
    } catch (error) {
        return Response.errorMessage(res, error.message, httpStatus.BAD_REQUEST);
    }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return Response.successMessage(res, "Users fetched successfully", users, httpStatus.OK);
  } catch (error) {
    return Response.errorMessage(res, "Internal server error", httpStatus.INTERNAL_SERVER_ERROR);
  }
};


const updateUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const user = await updateUser(userId, updateData);

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        return Response.errorMessage(res, 'An error occurred while updating the user', httpStatus.INTERNAL_SERVER_ERROR);
    }
};

const loginUser = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        const { user, token } = await authenticateUser(emailOrPhone, password);

        res.status(200).json({
            status: 'success',
            token,
            user,
        });
    } catch (error) {
        return Response.errorMessage(res, error.message, httpStatus.UNAUTHORIZED);
    }
};

export { registerUser, updateUserDetails, loginUser };
