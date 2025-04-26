import { HTTP_INTERNAL_SERVER_ERROR } from '../utils/constants';

export default class InternalServerError extends Error {
  statusCode: number;

  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.statusCode = HTTP_INTERNAL_SERVER_ERROR;
  }
}
