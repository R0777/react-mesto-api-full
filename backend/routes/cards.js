const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, addLike, unLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().pattern(/^https?:\/\/(www\.)?(([\w#!:.?+=&%@!\-/])*)?\.(([\w#!:.?+=&%@!\-/])*)?#?/),
  }),
}), createCard);

router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().min(2).max(30),
  }),
}), deleteCard);

router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().min(2).max(30),
  }),
}), addLike);

router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().min(2).max(30),
  }),
}), unLike);

module.exports = router;
