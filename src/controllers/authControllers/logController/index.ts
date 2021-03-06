import { RequestHandler } from "express";
import { verifyJWT } from "../../../auth";
import { IUserLog, IVerifyJWT } from "../../../types";
import loginByUserCredentials from './loginByUserCredentials';
import loginByFacialRecognition from './loginByFacialRecognition';

const logController: RequestHandler = async (req, res, next): Promise<void> => {
     const { user, token, resource }: IUserLog = req.body;
     // validations
     if (user || token || resource) {
          if (user) {
               await loginByUserCredentials(user, res);
               // is valid token?
          } else if (token) {
               const { authData }: IVerifyJWT = verifyJWT(req.body.token);
               if (authData) res.json({ tokenValid: true });
               else res.json({ tokenValid: false });

               // login by facial recognition
          } else if (resource) {
               loginByFacialRecognition(resource, res);
          }
     } else {
          res.status(400).send('The property "user" or "token" or "resource" has not been provided. You must pass some of two');
     }

}

export default logController;