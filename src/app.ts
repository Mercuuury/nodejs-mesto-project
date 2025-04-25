import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { cardsRouter, usersRouter } from './routes';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  // Временный вариант базовой авторизации
  // p.s. res.locals вместо req.user не вызывает ошибки TS и не требует расширения типов Express
  res.locals.user = {
    _id: '680bbfe280c46954e6dce210',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log('Работаем.');
});
