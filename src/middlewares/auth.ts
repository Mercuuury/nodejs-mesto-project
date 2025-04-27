import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { JWT_SECRET } from '../utils/constants';

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    return next();
  } catch {
    return next(new UnauthorizedError('Требуется авторизация'));
  }
};

export default auth;
