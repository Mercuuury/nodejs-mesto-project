import { Router } from 'express';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/cards';
import { validateRequest } from '../middlewares';
import { cardIdParamsSchema, createCardSchema } from '../schemas/card';

const router = Router();

router.get('/', getCards);
router.post('/', validateRequest({ body: createCardSchema }), createCard);
router.delete('/:cardId', validateRequest({ params: cardIdParamsSchema }), deleteCard);
router.put('/:cardId/likes', validateRequest({ params: cardIdParamsSchema }), likeCard);
router.delete('/:cardId/likes', validateRequest({ params: cardIdParamsSchema }), dislikeCard);

export default router;
