import { Request, Response } from 'express';
import User from '../models/user';

// GET /users — возвращает всех пользователей
export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

// GET /users/:userId - возвращает пользователя по _id
export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// POST /users — создаёт пользователя
export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
