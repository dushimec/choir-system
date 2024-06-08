import { User } from "../models/user.model";
import Response from "../helpers/response";
import httpStatus from "http-status";

export const assignRole = async (req,res) =>{
    try {
        const {userId,role} = req.body;
        const user = await User.findOne(userId)
        
        if(!user){
            return Response.errorMessage(res, "User not found", httpStatus.NOT_FOUND)
        }

        user.role = role;
        await user.save()
        return Response.errorMessage(res, "Role assigned succesfully", user, httpStatus.OK)
    } catch (error) {
        return Response.errorMessage(res, "Internal server error", httpStatus.INTERNAL_SERVER_ERROR);
    }
}