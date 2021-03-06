const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, getMe, updateUserAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(www\.)?(([\w#!:.?+=&%@!\-/])*)?\.(([\w#!:.?+=&%@!\-/])*)?#?/),
  }),
}), updateUserAvatar);

router.patch('/users/me/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser);

module.exports = router;
