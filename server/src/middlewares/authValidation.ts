import { authValidator } from '../utils/zodValidator.js';
import { Request, Response, NextFunction } from 'express';
import session from '../utils/sessions.js';
import { Entity } from 'redis-om';


export async function validateBodyForAuth(req: Request, res:Response, next: NextFunction) {
  try {
    const body = authValidator.parse(req.body);
    req.body = body;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'invalid input' });
  }
}

export async function validateSession(req: Request, res:Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('no authorization header');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new Error('no token');
    }
    const sessionData: Entity = await session.fetch(token);
    if (!sessionData) {
      throw new Error('invalid session');
    } 
    req.body.userId = sessionData.userId;
    req.body.token = token;
    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ msg: error.message });
  }

}

