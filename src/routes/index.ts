/**
 * Root Router
 * Redirecction to Request
 */

import { LogInfo } from '../utils/logger'
import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import goodbyeRouter from './GoodbyeRouter'
import usersRouter from './UserRouter'

// Server intance
const server = express() // Antes era un let

// Router Intance
const rootRouter = express.Router() // Antes era un let

// Activate for request to http://localhost:8000/api

// GET: http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api')
  // Send Hello World to the client
  res.send('Welcome to my API Restful: Express + Nodemon + Jest + TS + Swagger + Mongoose')
})

// Redirection to Routers & Controllers
server.use('/', rootRouter) // http://localhost:8000/api
server.use('/hello', helloRouter) // http://localhost:8000/api/hello ---> HelloRouter
// ADD more routes to the APP
server.use('/goodbye', goodbyeRouter) // http://localhost:8000/api/goodbye ---> GoodbyeRouter
server.use('/users', usersRouter) // http://localhost:8000/api/users ---> UsersRouter

export default server
