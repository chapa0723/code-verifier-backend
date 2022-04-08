import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Configuration the .env file
dotenv.config();

//Create express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Define the first route of APP
app.get('/', (req: Request, res: Response) => {
    // Send Hello World to the client
    res.send('Welcome to my API Restful: Express + Nodemon + Jest + TS + Swagger + Mongoose');
});

// Define the first route of APP
app.get('/hello', (req: Request, res: Response) => {
    // Send Hello World to the client
    res.send('Welcom to GET Route Hello!!!');
});

// Execute APP and listen Requests to port
app.listen(port, () => {
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`)
});