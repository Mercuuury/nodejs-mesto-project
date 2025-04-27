import { HTTP_FORBIDDEN } from '../utils/constants';

export default class ForbiddenError extends Error {
  statusCode: number;

  constructor(message = 'Вы не можете совершить это действие') {
    super(message);
    this.statusCode = HTTP_FORBIDDEN;
  }
}
