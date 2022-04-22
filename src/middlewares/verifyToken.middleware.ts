import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Config dotenv to read enviroment variables
dotenv.config();

const secret = process.env.SECRETKEY || 'MY SECRETKEY';

/**
 * 
 * @param {Request} req Original request prevuis middleware of verification JWT
 * @param {Response} res Response to verification of JWT
 * @param {NextFunction} next Next Function to be executed
 * @returns Error of verification or next execution
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check HEADER  from Request for 'x-access-token'
  let token: any = req.headers['x-access-token'];

  // Verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not authorised to consume this endpoint'
    });
  }
  // Verify the token obtained, We pass the secret
  // TODO: pass secret key
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT Verification Failed',
        message: 'Failed to verify JWT token in request'
      });
    }


    // Execute next function -> Protected routes will be executed
    next()
  })
}
