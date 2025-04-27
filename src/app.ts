import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { auth, errorHandler, routeInvalidator } from './middlewares';
import { cardsRouter, usersRouter } from './routes';
import { createUser, login } from './controllers/users';

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(routeInvalidator);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}.`);
});
