import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  ConflictError, NotFoundError, UnauthorizedError,
} from '../errors';
import User from '../models/user';
import {
  HTTP_CREATED,
  JWT_SECRET,
  SALT_ROUNDS,
  WEEK_IN_MS,
} from '../utils/constants';
import sendResponse from '../utils/sendResponse';

// GET /users — возвращает всех пользователей
const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => sendResponse(res, users))
  .catch(next);

// GET /users/:userId - возвращает пользователя по _id
const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с указанным _id не найден');
      sendResponse(res, user);
    })
    .catch(next);
};

// GET /users/me — возвращает профиль авторизованного пользователя
const getProfile = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user?._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным _id не найден');
      }
      sendResponse(res, user);
    })
    .catch(next);
};

// PATCH /users/me — обновляет профиль
const updateProfile = (req: Request, res: Response, next: NextFunction) => User.findByIdAndUpdate(
  req.user?._id,
  req.body,
  { new: true },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь c указанным _id не найден');
    sendResponse(res, user);
  })
  .catch(next);

// PATCH /users/me/avatar — обновляет аватар
const updateAvatar = (req: Request, res: Response, next: NextFunction) => User.findByIdAndUpdate(
  req.user?._id,
  req.body,
  { new: true },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь c указанным _id не найден');
    sendResponse(res, user);
  })
  .catch(next);

// POST /signup — создаёт пользователя
const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { password, ...rest } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ ...rest, password: hash }))
    .then((user) => {
      const { password: _, ...userData } = user.toObject();
      sendResponse(res, userData, HTTP_CREATED);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

// POST /signin — авторизует пользователя
const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неправильные почта или пароль');

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new UnauthorizedError('Неправильные почта или пароль');

          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

          res
            .cookie('jwt', token, { httpOnly: true, sameSite: true, maxAge: WEEK_IN_MS })
            .send({ message: 'Пользователь успешно авторизован' });
        });
    })
    .catch(next);
};

export {
  getUsers, getUserById, getProfile, updateProfile, updateAvatar, createUser, login,
};
