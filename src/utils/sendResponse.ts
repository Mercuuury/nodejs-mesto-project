import { Response } from 'express';
import { HTTP_OK } from './constants';

const sendResponse = (res: Response, data: any, statusCode = HTTP_OK) => {
  res.status(statusCode).send({ data });
};

export default sendResponse;
