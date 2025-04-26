import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { BadRequestError, NotFoundError } from '../errors';

// GET /cards — возвращает все карточки
const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

// POST /cards — создаёт карточку
const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: res.locals.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send({ _id: card._id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id карточки'));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: res.locals.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка или некорректный _id карточки'));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: res.locals.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка или некорректный _id карточки'));
      } else {
        next(err);
      }
    });
};

export {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
