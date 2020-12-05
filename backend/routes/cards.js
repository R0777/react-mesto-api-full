const router = require('express').Router();
const { errors, celebrate, Joi } = require('celebrate');
const urlRegex = require('url-regex');

const {
  getCards, createCard, deleteCard, addLike, unLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), createCard);

router.delete('/cards/:id', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), deleteCard);

router.put('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), addLike);

router.delete('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), unLike);

module.exports = router;
