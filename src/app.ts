import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import {
  auth, errorHandler, errorLogger, requestLogger, routeInvalidator,
  validateRequest,
} from './middlewares';
import { cardsRouter, usersRouter } from './routes';
import { loginSchema, registerSchema } from './schemas/auth';

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signin', validateRequest({ body: loginSchema }), login);
app.post('/signup', validateRequest({ body: registerSchema }), createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(routeInvalidator);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}.`);
});
