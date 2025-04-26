import { HTTP_NOT_FOUND } from '../utils/constants';

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message = 'Запрашиваемый ресурс не найден') {
    super(message);
    this.statusCode = HTTP_NOT_FOUND;
  }
}
