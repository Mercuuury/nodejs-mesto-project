import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors';

const routeInvalidator = (_req: Request, _res: Response, _next: NextFunction) => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
};

export default routeInvalidator;
