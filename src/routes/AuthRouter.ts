/* eslint-disable prefer-const */
import express, { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// Import BCRYPT for password encryption
import bcrypt from 'bcrypt';

// Router from express
let authRouter = express.Router();

authRouter.route('/auth/register')
  .post(async (req: Request, res: Response) => {
    let { name, email, password, age } = req.body
    let hashedPassword = ''
    if (name && email && password && age) {
      // Obtain the password in request an cypher
      hashedPassword = bcrypt.hashSync(req.body.password, 10)
      let newUser: IUser = {
        name,
        password: hashedPassword,
        age,
        email
      }

      // Controller instance to execute
      const controller: AuthController = new AuthController();
      // Obtain Response
      const response: any = await controller.registerUser(newUser);
      // Send to the client the response
      return res.status(200).send(response);
    }
  })

authRouter.route('/auth/login')
  .post(async (req: Request, res: Response) => {
    let { email, password } = req.body
    if (email && password) {
      // TODO: use IAuth
      let auth: IAuth = {
        email,
        password
      }

      // Controller instance to execute
      const controller: AuthController = new AuthController();
      // Obtain Response
      const response: any = await controller.loginUser(auth);
      // Send to the client the response which includes the JWT to authorize requests
      return res.status(200).send(response);
    }
  })

export default authRouter;