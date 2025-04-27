import { z } from 'zod';

export const userIdParamsSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Неверный формат ID пользователя'),
});

export const updateProfileSchema = z.object({
  name: z.string()
    .min(2, 'Имя должно быть строкой от 2 до 30 символов')
    .max(30, 'Имя должно быть строкой от 2 до 30 символов')
    .optional(),
  about: z.string()
    .min(2, 'Описание должно быть строкой от 2 до 200 символов')
    .max(200, 'Описание должно быть строкой от 2 до 200 символов')
    .optional(),
}).strict();

export const updateAvatarSchema = z.object({
  avatar: z.string().url('Некорректный URL аватара'),
}).strict();
