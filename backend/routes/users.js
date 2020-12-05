const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require('url-regex');
const {
  getUser, getUsers, getMe, updateUserAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex()),
  }),
}), updateUserAvatar);

router.patch('/users/me/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(50),
    about: Joi.string().max(50),
  }),
}), updateUser);

router.get('/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().min(20).max(30).required(),
  }),
}), getUser);

module.exports = router;
