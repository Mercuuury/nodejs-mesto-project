import { HTTP_CONFLICT } from '../utils/constants';

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message = 'При выполнении запроса возник конфликт') {
    super(message);
    this.statusCode = HTTP_CONFLICT;
  }
}
