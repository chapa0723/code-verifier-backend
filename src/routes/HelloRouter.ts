import express, { Request, Response } from 'express';
import { HelloController } from '@/controller/HelloController';
import { LogInfo } from '@/utils/logger';

// Router from express
let helloRouter = express.Router();

// http://localhost:8000/api/hello?name=Martin/
helloRouter.route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    let name: any = req?.query?.name;
    LogInfo(`Query Param: ${name}`);
    // Controller instance to excute
    const controller: HelloController = new HelloController();
    // Obtain Response
    const response = await controller.getMessage(name);
    // Send to the client the response
    return res.send(response);
  })

// Export Hellorouter
export default helloRouter;