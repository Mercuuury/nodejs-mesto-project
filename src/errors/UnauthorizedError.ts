import { HTTP_UNAUTHORIZED } from '../utils/constants';

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message = 'Не авторизован') {
    super(message);
    this.statusCode = HTTP_UNAUTHORIZED;
  }
}
