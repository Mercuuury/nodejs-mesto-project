import { Request, Response } from 'express';
import Card from '../models/card';

// GET /cards — возвращает все карточки
const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

// POST /cards — создаёт карточку
const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: res.locals.user._id })
    .then((card) => res.status(201).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req: Request, res: Response) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete(cardId)
    .then((card) => res.send({ _id: card?._id }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req: Request, res: Response) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: res.locals.user._id } },
  { new: true },
)
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req: Request, res: Response) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: res.locals.user._id } },
    { new: true },
  )
  .then((card) => res.send(card))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

export {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
