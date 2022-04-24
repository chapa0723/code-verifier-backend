/* eslint-disable prefer-const */
import express, { Request, Response } from 'express';
import { KatasController } from '../controller/KatasController';
import { LogInfo } from '../utils/logger';
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface';

// Import verifytoken from middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body parser ro read BODY from request
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();

// Router from express
let kataRouter = express.Router();


// http://localhost:8000/api/katas?id=xxxxxxxxxxxxxx
kataRouter.route('/')
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {

    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;

    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param: ${id}`);
    
    // Controller instance to execute
    const controller: KatasController = new KatasController();
    
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id);
    
    // Send to the client the response
    return res.status(200).send(response);
  })
  // DELETE:
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller instance to execute
    const controller: KatasController = new KatasController();
    // Obtain Response
    const response: any = await controller.deleteKata(id);
    // Send to the client the response
    return res.status(200).send(response);
  })
  // PUT:
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    let id: any = req?.query?.id;

    // Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.stars || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution || '';
    let participants: string[] = req?.body?.participants || [];

    if (name && description && level && intents && stars && creator && solution && participants) {
      // Controller instance to execute
      const controller: KatasController = new KatasController();
      let kata: IKata = {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants
      }
      // Obtain Response
      const response: any = await controller.updateKata(kata, id);
      // Send to the client the response
      return res.status(200).send(response);
    } else {
      return res.status(400).send({
        message: '[ERROR]: Updating KATA you need send all the fields of KATA'
      });
    }
  })
  // POST:
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {

    // Read from body
    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.stars || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution || '';
    let participants: string[] = req?.body?.participants || [];

    if (name && description && level && intents && stars && creator && solution && participants) {
      // Controller instance to execute
      const controller: KatasController = new KatasController();
      let kata: IKata = {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants
      }
      // Obtain Response
      const response: any = await controller.createKata(kata);
      // Send to the client the response
      return res.status(201).send(response);
    } else {
      return res.status(400).send({
        message: '[ERROR]: Updating KATA you need send all the fields of KATA'
      });
    }
  })
// Export KataRouter
export default kataRouter;

/**
 * Get Documents  => 200 OK
 * Creation Document => 201 OK
 * Delete Document => 200(Entity) / 204 (No return)
 * Update Document => 200(Entity) / 204 (No return) 
 */