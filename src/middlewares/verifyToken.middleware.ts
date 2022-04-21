import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
  // Verify the token obtained
  jwt.verify(token, '', (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT Verification Failed',
        message: 'Failed to verify JWT token in request'
      });
    }

    // Pass something to next reques () id of user || other info
    // Execute next function -> Protected routes will be executed
    next()
  })
}
