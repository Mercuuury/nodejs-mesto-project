import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

const requestTransport = new winston.transports.DailyRotateFile({
  filename: 'request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: 7,
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: 7,
});

export const requestLogger = expressWinston.logger({
  transports: [requestTransport],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [errorTransport],
  format: winston.format.json(),
});
