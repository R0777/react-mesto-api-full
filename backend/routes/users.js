const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, getMe, updateUserAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

router.patch('/users/me/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(20).max(30),
    about: Joi.string().min(20).max(30),
  }),
}), updateUser);

router.get('/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().min(20).max(30).required(),
  }),
}), getUser);

module.exports = router;
