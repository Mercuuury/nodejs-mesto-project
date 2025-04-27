import { HTTP_BAD_REQUEST } from '../utils/constants';

export default class ValidationError extends Error {
  statusCode: number;

  errors: Array<{ message: string; path: (string | number)[] }>;

  constructor(
    errors: Array<{ message: string; path: (string | number)[] }>,
    message = 'При валидации данных возникла ошибка',
  ) {
    super(message);
    this.statusCode = HTTP_BAD_REQUEST;
    this.errors = errors;
  }
}
