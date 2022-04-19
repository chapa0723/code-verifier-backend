import express, { Request, Response } from 'express';
import { katasController } from '../controller/KatasController';
import { LogInfo } from '../utils/logger';

// Router from express
let kataRouter = express.Router();

// http://localhost:8000/api/katas
kataRouter.route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller instance to execute
    const controller: katasController = new katasController();
    // Obtain Response
    const response: any = await controller.getKatas(id);
    // Send to the client the response
    return res.send(response);
  })
  // DELETE:
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller instance to execute
    const controller: katasController = new katasController();
    // Obtain Response
    const response: any = await controller.deleteKata(id);
    // Send to the client the response
    return res.send(response);
  })
  // POST:
  .post(async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    let description: any = req?.query?.description;
    let level: any = req?.query?.level;
    let user: any = req?.query?.user;
    let date: any = req?.query?.date;
    let valoration: any = req?.query?.valoration;
    let chances: any = req?.query?.chances;    
    // Controller instance to execute
    const controller: katasController = new katasController();
    let kata = {
      name: name || 'default',
      description: description || 'default description',
      level: level || 5,
      user: user || 'default',
      date: date || new Date(),
      valoration: valoration || 0,
      chances: chances || 0
    }
    // Obtain Response
    const response: any = await controller.createKata(kata);
    // Send to the client the response
    return res.send(response);
  })
  // PUT:
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    let name: any = req?.query?.name;
    let description: any = req?.query?.description;
    let level: any = req?.query?.level;
    let user: any = req?.query?.user;
    let date: any = req?.query?.date;
    let valoration: any = req?.query?.valoration;
    let chances: any = req?.query?.chances;
    LogInfo(`Query Param: ${id}, ${name}, ${description}, ${level}, ${user}, ${date}, ${valoration}, ${chances}`);
    // Controller instance to execute
    const controller: katasController = new katasController();
    let kata = {
      name: name || 'default',
      description: description || 'default description',
      level: level || 5,
      user: user || 'default',
      date: date || new Date(),
      valoration: valoration || 0,
      chances: chances || 0
    }
     // Obtain Response
     const response: any = await controller.updateKata(id, kata);
     // Send to the client the response
    return res.send(response);
  }
// Export Hellorouter
export default kataRouter;