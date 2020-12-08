require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), login);
app.post('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?(([\w#!:.?+=&%@!\-/])*)?\.(([\w#!:.?+=&%@!\-/])*)?#?/),
  }),
}), createUser);

// Уважаемый Рамиль. Надеюсь теперь, я добавил все, что вы хотели.
// Хочу отметить, что относительно вопроса в необходимости этой,
// последней правки, я с вами не согласен совсем.
// Реально, обоснованных причин добавления селебрейта в этот роут нету,
// кроме как устаревший чек лист. Буду признателен если вы напишете подробнее о
// причинах по которым эта правка необходима. Спасибо

app.use(auth);
app.use('/', users);
app.use('/', cards);
app.use('/', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

app.listen(PORT, () => {
  console.log(`Working on port ${PORT}`);
});
