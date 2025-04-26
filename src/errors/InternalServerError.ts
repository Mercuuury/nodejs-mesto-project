export default class InternalServerError extends Error {
  statusCode: number;

  constructor(message = 'На сервере произошла ошибка') {
    super(message);
    this.statusCode = 500;
  }
}
