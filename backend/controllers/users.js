const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badRequestError');
const NotAuthorizeError = require('../errors/notAuthorizeError');
const ErrorNotFound = require('../errors/errorNotFound');
const NotAllowToCreateUser = require('../errors/notAllowToCreateUser');

const { JWT_SECRET } = process.env;

const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).send(user);
    }
    throw new ErrorNotFound('Пользователь c таким id не найден');
  } catch (error) {
    return next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar, id } = req.body;
    const user = await User.findByIdAndUpdate(id, { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      });

    if (user) {
      return res.status(200).send(user);
    }
    throw new ErrorNotFound('Пользователь не найден');
  } catch (error) {
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      throw new BadRequestError('Что-то не так с запросом');
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new BadRequestError('Что-то не так с запросом');
    }
    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Что-то не так с запросом');
  }
  return User.findOne({ email }).select('+password')
    .then((admin) => {
      if (!admin) {
        throw new NotAuthorizeError('Невалидные данные');
      }
      return bcrypt.compare(password, admin.password)
        .then((matched) => {
          if (matched) {
            // localStorage.setItem(CLINT_ID, admin._id);
            const token = jwt.sign({
              id: admin._id,
              email: admin.email,
            }, JWT_SECRET);
            return res.status(200).send({ token });
          }
          throw new NotAuthorizeError('Невалидные данные');
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Невалидные данные' });
  }
  return User.findOne({ email }).select('+password')
    .then((admin) => {
      if (admin) {
        throw new NotAllowToCreateUser('Такой пользователь уже есть в БД');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({ email, password: hash }))
        .then(({ _id }) => {
          res.status(200).send({ _id });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUser, getUsers, createUser, getMe, login, updateUserAvatar,
};
