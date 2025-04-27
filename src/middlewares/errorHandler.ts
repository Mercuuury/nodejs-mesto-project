import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors';
import { HTTP_INTERNAL_SERVER_ERROR } from '../utils/constants';

const errorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || HTTP_INTERNAL_SERVER_ERROR;
  const message = statusCode === HTTP_INTERNAL_SERVER_ERROR
    ? new InternalServerError().message
    : err.message;

  res.status(statusCode).send({ message });

  next();
};

export default errorHandler;
