/* eslint-disable prefer-const */
import express, { Request, Response } from 'express';
import { UsersController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
// Import BCRYPT for password encryption
import bcrypt from 'bcrypt';

// Import verifytoken from middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body parser ro read BODY from request
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();

// Router from express
let userRouter = express.Router();


// http://localhost:8000/api/users?id=xxxxxxxxxxxxxx
userRouter.route('/')
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {

    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;

    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param: ${id}`);
    
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    
    // Obtain Response
    const response: any = await controller.getUsers(page, limit, id);
    
    // Send to the client the response
    return res.status(200).send(response);
  })
  // DELETE:
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send to the client the response
    return res.status(200).send(response);
  })
  // PUT:
  .put(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    let name: any = req?.query?.name;
    let email: any = req?.query?.email;
    let age: any = req?.query?.age;
    LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`);
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    let user = {
      name: name,
      email: email,
      age: age
    }
    // Obtain Response
    const response: any = await controller.updateUser(id, user);
    // Send to the client the response
    return res.status(200).send(response);
  });

// http://localhost:8000/api/users?id=xxxxxxxxxxxxxx
userRouter.route('/katas')
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;

    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;
    
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id);
    
    // Send to the client the response
    return res.status(200).send(response);
  })

// Export Hellorouter
export default userRouter;

/**
 * Get Documents  => 200 OK
 * Creation Document => 201 OK
 * Delete Document => 200(Entity) / 204 (No return)
 * Update Document => 200(Entity) / 204 (No return) 
 */