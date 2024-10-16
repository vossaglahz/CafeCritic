НАЧАЛО:
npm run dev -> если запустить в 12exam папке запустит ultra runner, установит все модульсы и запустит сервер и клиент
или
cd server -> npm i -> npm run dev
cd client -> npm i -> npm run dev

cd server -> npm run seed -> создает 2 users, один admin, один user, у них пароль "test"
У вас по умолчанию published = true

У admin есть преимущество перед user, если залогиниться под admin, то будет доступно nav button для модерирование запросов

Делать запросы кроме patch, delete могут все авторизованные users
patch, delete доступен только admin

Все Route доступны в папке routes

MySQL - PORT: 8000