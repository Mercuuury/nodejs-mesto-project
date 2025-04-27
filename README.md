# Mesto Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.5-green)](https://www.mongodb.com/)

Backend API для интерактивной галереи Mesto с возможностью добавлять фотографии, ставить лайки и редактировать профиль.

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/mesto-backend.git
cd mesto-backend
```
2. Установите зависимости:
```bash
npm install
```


## Команды

- Разработка (с hot-reload):
```bash
npm run dev
```
- Запуск в production:
```bash
npm run build
npm start
```
- Линтинг:
```bash
npm run lint
```

## Маршруты API

### Документация Apidog
https://2e6qk5n1p4.apidog.io

### Аутентификация

- `POST /signin` — Вход
- `POST /signup` — Регистрация

### Пользователи

- `GET /users` — Получить всех пользователей
- `GET /users/me` — Получить текущего пользователя
- `PATCH /users/me` — Обновить профиль
- `PATCH /users/me/avatar` — Обновить аватар
- `GET /users/:userId` — Получить пользователя по ID

### Карточки

- `GET /cards` — Получить все карточки
- `POST /cards` — Создать карточку
- `DELETE /cards/:cardId` — Удалить карточку
- `PUT /cards/:cardId/likes` — Поставить лайк
- `DELETE /cards/:cardId/likes` — Убрать лайк

## Технологии и безопасность

- База данных: MongoDB с Mongoose ODM
- Логирование: Winston с ротацией логов
- Валидация: Zod
- Безопасность:
  - Helmet для защиты HTTP-заголовков
  - Rate limiting
  - JWT аутентификация
  - Cookie-based сессии

## Ссылка на репозиторий:
https://github.com/Mercuuury/nodejs-mesto-project
