require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

// app.use('*', cors({
//   origin: 'https://r0777.students.nomoredomains.work/',
// }));
// app.use(cors());
// app.options('*', cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Alow-Origin', '*');
//   res.setHeader('Access-Control-Alow-Methods', '*');
//   res.setHeader('Access-Control-Alow-Headers', '*');
//   next();
// });

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors());
//app.options('*', cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), createUser);

app.use(auth);
app.use('/', users);
app.use('/', cards);
app.use('/', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.use(errorLogger);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Working on port ${PORT}`);
});
