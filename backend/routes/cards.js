const router = require('express').Router();
const { errors, celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, addLike, unLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
  }),
}), createCard);

router.delete('/cards/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteCard);

router.put('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), addLike);

router.delete('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), unLike);

module.exports = router;
