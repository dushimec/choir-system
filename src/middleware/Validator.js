import {check, query, validationResult} from 'express-validator'
import Response from '../helpers/response'
import User from '../models/user.model'
import httpStatus from 'http-status'


class Validator {
    static validateInput = (req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage = errors.errors.map((err) => err.msg);
            return Response.errorMessage(res,errorMessage,400);
        }
        return next();
    }

    static newAccountRules(){
        return [
            check("name","name should be valid").trim().isAlpha(),
            check("email", "email should be valid").trim().isEmail(),
            check("phone", "phone should be valid").trim().isNumeric(),
            check("password", "A valid password should have a character, number, UPPER CASE letter and a lower case letter and should be longer than 8 characters")
              .isLength({ min: 8 })
              .matches(/\d/)
              .matches(/[A-Z]/)
              .matches(/[a-z]/),
             
        ]
    }
    static newSingerRoules(){{
      return [
        check("name", "name should be valid").trim().isAlpha(),
        check("phone","phone should valid").trim().isNumeric()
      ]
    }}

    static updatePasswordRuley() {
      return [
          check("password", "A valid password should have a character, number, UPPER CASE letter and a lower case letter and should be longer than 8 characters")
              .isLength({ min: 8 })
              .matches(/\d/)
              .matches(/[A-Z]/)
              .matches(/[a-z]/),
      ];
  }

      static loginSecretary() {
        return [
          check("email", "email should be valid").trim().isEmail(),
          check("password", "Password should be valid").isString(),
        ];
      }

      static loginDisciplinary() {
        return [
          check("email", "email should be valid").trim().isEmail(),
          check("password", "Password should be valid").isString(),
        ];
      }

      static loginAdmin() {
        return [
          check("email", "email should be valid").trim().isEmail(),
          check("password", "Password should be valid").isString(),
        ];
      }

      static loginSingerRules() {
        return [
            check("phone", "phone should be valid").trim().isNumeric(),
        ];
      }

      static recordAttendanceRules() {
        return [
            check('singerId', 'Singer ID should be valid').isMongoId(),
            check('status', 'Status should be either present or absent').isIn(['present', 'absent']),
            check('event', 'Event should be valid').isString().notEmpty()
        ];
    }
}

export default Validator;