const router = require('express').Router();
const { errors, celebrate, Joi } = require('celebrate');
const urlRegex = require('url-regex');
const {
  getUser, getUsers, getMe, updateUserAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(40),
    link: Joi.string().required().regex(urlRegex()),
  }),
}), updateUserAvatar);

router.patch('/users/me/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), updateUser);

router.get('/users/:id', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), getUser);

module.exports = router;
