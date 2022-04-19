import express, { Request, Response } from 'express';
import { UsersController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=62557bc4978ba7a30fb650f8
userRouter.route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    // Obtain Response
    const response: any = await controller.getUsers(id);
    // Send to the client the response
    return res.send(response);
  })
  // DELETE:
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send to the client the response
    return res.send(response);
  })
  // POST:
  .post(async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    let email: any = req?.query?.email;
    let age: any = req?.query?.age;
    // Controller instance to execute
    const controller: UsersController = new UsersController();
    let user = {
      name: name || 'default',
      email: email || 'default@gmail.com',
      age: age || 18
    }
    // Obtain Response
    const response: any = await controller.createUser(user);
    // Send to the client the response
    return res.send(response);
  })
  // PUT:
  .put(async (req: Request, res: Response) => {
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
    return res.send(response);
  }

// Export Hellorouter
export default userRouter;