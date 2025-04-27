import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, NotFoundError } from '../errors';
import Card from '../models/card';
import { HTTP_CREATED } from '../utils/constants';
import sendResponse from '../utils/sendResponse';

// GET /cards — возвращает все карточки
const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => sendResponse(res, cards))
  .catch(next);

// POST /cards — создаёт карточку
const createCard = (req: Request, res: Response, next: NextFunction) => Card.create({
  ...req.body,
  owner: req.user?._id,
})
  .then((card) => sendResponse(res, card, HTTP_CREATED))
  .catch(next);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (req: Request, res: Response, next: NextFunction) => Card.findById(
  req.params.cardId,
)
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка с указанным _id не найдена');

    if (card.owner.toString() !== req.user?._id.toString()) {
      throw new ForbiddenError('У вас нет прав для удаления этой карточки');
    }

    return card.remove();
  })
  .then((card) => sendResponse(res, { _id: card._id }))
  .catch(next);

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным _id не найдена');
      sendResponse(res, card);
    })
    .catch(next);
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка с указанным _id не найдена');
      sendResponse(res, card);
    })
    .catch(next);
};

export {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
};
