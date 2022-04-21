/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
import express, { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// Import BCRYPT for password encryption
import bcrypt from 'bcrypt';

// Middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body parser to read BODY from request
import bodyParser from 'body-parser';

// Middleware to read JSON in BODY
let jsonParser = bodyParser.json();

// Router from express
let authRouter = express.Router();

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {

    let { name, email, password, age } = req?.body
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
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR User data missing]: No user can be register'
      });
    }
  });

authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {

    let { email, password } = req?.body

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

    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR User data missing]: No user can be register'
      });
    }
  })

// Route protected by Verify Token middleware
authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => { // primero se ejectuta el MIDDLEWARE (verifyToken) para luego pasar a la siguienbte funcion
    // obtain tje iD of user to check it's data
    let id: any = req?.query?.id;
    if (id) {

      // Controller: auth Controller
      const controller: AuthController = new AuthController();

      // Obtain Response
      let response: any = await controller.userData(id);

      // If user are authorized to access the data
      return res.status(200).send(response);

    } else {
      return res.status(401).send({
        message: '[ERROR]: You are note authorised to perfomr this action'
      }
      );
    }
  });

export default authRouter;