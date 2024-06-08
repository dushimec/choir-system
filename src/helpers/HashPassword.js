import bcrypt from 'bcrypt'
import 'dotenv/config'

export default class HashPassword {
    static hashPassword(password){
        const hashedPassword = bcrypt.hashSync(password,10)
        return hashedPassword;
    }

    static matchingPassword(givenPwd, result){
        const {password:actualPassword} = result;
        const isPasswordMatch = bcrypt.compareSync(givenPwd,actualPassword)
        return isPasswordMatch;
    }
}