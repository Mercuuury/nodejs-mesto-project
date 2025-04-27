import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некорректный формат адреса электронной почты'),
  password: z.string(),
}).strict();

export const registerSchema = z.object({
  email: z.string().email('Некорректный формат адреса электронной почты'),
  password: z.string(),
  name: z.string()
    .min(2, 'Имя должно быть строкой от 2 до 30 символов')
    .max(30, 'Имя должно быть строкой от 2 до 30 символов')
    .optional(),
  about: z.string()
    .min(2, 'Описание должно быть строкой от 2 до 200 символов')
    .max(200, 'Описание должно быть строкой от 2 до 200 символов')
    .optional(),
  avatar: z.string()
    .url('Некорректный URL аватара')
    .optional(),
}).strict();
