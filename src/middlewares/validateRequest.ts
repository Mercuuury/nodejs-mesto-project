import { Request, Response, NextFunction } from 'express';
import { SafeParseReturnType, ZodSchema } from 'zod';
import { ValidationError } from '../errors';

const checkResult = (result: SafeParseReturnType<any, any>) => {
  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      message: err.message,
      path: err.path,
    }));
    throw new ValidationError(errors, 'При валидации данных возникла ошибка');
  }
};

const validateRequest = (schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (schema.body) {
      const result = schema.body.safeParse(req.body);
      checkResult(result);
      req.body = result.data;
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      checkResult(result);
      req.query = result.data;
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      checkResult(result);
      req.params = result.data;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default validateRequest;
