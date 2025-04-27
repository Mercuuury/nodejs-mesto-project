import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { JWT_SECRET } from '../utils/constants';

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  req.body.user = payload;

  return next();
};

export default auth;
