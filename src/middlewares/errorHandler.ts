import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors';
import { HTTP_INTERNAL_SERVER_ERROR } from '../utils/constants';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode = HTTP_INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === HTTP_INTERNAL_SERVER_ERROR
        ? new InternalServerError().message
        : message,
    });
};

export default errorHandler;
