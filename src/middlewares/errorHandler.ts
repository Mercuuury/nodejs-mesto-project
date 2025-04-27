import { NextFunction, Request, Response } from 'express';
import { InternalServerError, ValidationError } from '../errors';
import { HTTP_INTERNAL_SERVER_ERROR } from '../utils/constants';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  const statusCode = 'statusCode' in err ? (err as any).statusCode : HTTP_INTERNAL_SERVER_ERROR;
  const message = statusCode === HTTP_INTERNAL_SERVER_ERROR
    ? new InternalServerError().message
    : err.message;

  res.status(statusCode).json({ message });
};

export default errorHandler;
