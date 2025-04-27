import cookieParser from 'cookie-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import {
  auth, errorHandler, errorLogger, requestLogger, routeInvalidator,
  validateRequest,
} from './middlewares';
import { cardsRouter, usersRouter } from './routes';
import { loginSchema, registerSchema } from './schemas/auth';
import { FIFTEEN_MINUTES } from './utils/constants';

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Ограничение числа запросов
app.use(rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: 100,
  message: 'Слишком много запросов с вашего IP, попробуйте позже',
}));

// Подключение к БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// Логирование запросов
app.use(requestLogger);

// Публичные маршруты
app.post('/signin', validateRequest({ body: loginSchema }), login);
app.post('/signup', validateRequest({ body: registerSchema }), createUser);

// Защищенные маршруты
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Обработка несуществующих маршрутов
app.use(routeInvalidator);

// Логирование ошибок
app.use(errorLogger);

// Обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}.`);
});
