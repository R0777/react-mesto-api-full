const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require('url-regex');

const {
  getCards, createCard, deleteCard, addLike, unLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().regex(urlRegex()),
  }),
}), createCard);

router.delete('/cards/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().min(2).max(50),
  }),
}), deleteCard);

router.put('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().min(2).max(50),
  }),
}), addLike);

router.delete('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().min(2).max(50),
  }),
}), unLike);

module.exports = router;
