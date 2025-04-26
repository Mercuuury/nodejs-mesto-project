import { HTTP_BAD_REQUEST } from '../utils/constants';

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message = 'Некорректные данные') {
    super(message);
    this.statusCode = HTTP_BAD_REQUEST;
  }
}
