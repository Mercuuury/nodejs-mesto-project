// schemas/card.ts
import { z } from 'zod';

export const cardIdParamsSchema = z.object({
  cardId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Неверный формат ID карточки'),
});

export const createCardSchema = z.object({
  name: z.string()
    .min(2, 'Название должно быть строкой от 2 до 30 символов')
    .max(30, 'Название должно быть строкой от 2 до 30 символов'),
  link: z.string().url('Некорректный URL изображения'),
}).strict();
