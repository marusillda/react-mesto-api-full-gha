[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# Учебный проект Mesto (бэкенд и фронтенд на удалённом сервере)

Проект представляет собой интерактивную страницу, на которой пользователь может делиться с другими пользователями Интернета своими фотографиями. Пользователь может редактировать свой профиль, добавлять и удалять фотографии, ставить лайки. Другие пользователи, в свою очередь, тоже могут оценивать Ваши фотографии, поставив им лайк. В данный проект добавлены регистрация и авторизация пользователя. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 

## [Демонстрация сайта](https://marusillda.github.io/mesto/)

![Превью проекта](./frontend/src/images/mesto-full-gha.jpg)

Код проекта можно посмотреть по [ссылке](https://github.com/marusillda/react-mesto-api-full-gha)

**Выполнена реализация бэкенд части проекта, в которой предусмотрено:** 
* запуск сервера;
* установка соединения с NoSQL БД - MongoDB;
* описание схем и моделей документов в БД;
* централизованная обработка возможных ошибок;
* возможность регистрации и авторизации пользователя;
* создание основных маршрутов;
* защита части маршрутов от неавторизованных пользователей;
* обработка запросов по маршрутам;
* валидация данных запроса с помощью Joi;

**Использованы следующие методы и технологии:**
- Node.js
- Express
- MongoDB
- Mongoose
- ESLint
- Clebrate & Joi
- Winston - логирование ошибок & запросов

**Работа с сервером:**
- Создание виртуальной машины на Yandex Cloud
- Установка MongoDB, Git, Node.js на сервер
- Установка и запуск pm2
- Создание и прикрепление доменных имён
- Установка и запуск nginx
- SSL-сертификат

## Ссылки на проект

IP 62.84.123.152

Frontend https://mesto.marusillda.nomoreparties.sbs

Backend https://api.mesto.marusillda.nomoreparties.sbs
