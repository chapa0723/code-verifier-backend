import express, { Express, Request, Response } from 'express';

// Enviroment viabales
import dotenv from 'dotenv';

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

// Root Router
import rootRuter from '../routes';

// Configuration the .env file
dotenv.config();

// Create express APP
const server: Express = express();
// const port: string | number = process.env.PORT || 8000;

// Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://locelhost:8000/api/...
server.use(
  '/api',
  rootRuter
);

// Static Server
server.use(express.static('public'));

// TODO Moongoose connection

// Security Config
server.use(helmet());
server.use(cors());

// Content-Type Config
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({limit: '50mb'}));

// Redirection Config
// http:localhost:8000/ ---> https:localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api');
});

export default server;