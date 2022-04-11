import { GoodbyeResponse } from '@/controller/types';
import express, { Request, Response } from 'express';
import { GoodbyeController } from '../controller/GoodbyeController';
import { LogInfo } from '../utils/logger';

// Router from express
let goodbyeRouter = express.Router();

// http://localhost:8000/api/goodbye?name=Martin/
goodbyeRouter.route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    let name: any = req?.query?.name;
    LogInfo(`Query Param: ${name}`);
    // Controller instance to excute
    const controller: GoodbyeController = new GoodbyeController();
    // Obtain Response
    const response: GoodbyeResponse = await controller.getMessage(name);
    // Send to the client the response
    return res.send(response);
  })

// Export Hellorouter
export default goodbyeRouter;