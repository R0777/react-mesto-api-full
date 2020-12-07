const Card = require('../models/card');
const ErrorNotFound = require('../errors/errorNotFound');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (error) {
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findOne({ _id: id });
    if (!card) {
      throw new ErrorNotFound('Такой карточки нет');
    }
    if (card.owner === req.user.id) {
      await Card.deleteOne(card);
      return res.status(200).send({ message: 'Карточка удалена' });
    }
    throw new ForbiddenError('Доступ запрещен');
  } catch (error) {
    return next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const likeCard = await Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user.id } },
      { new: true });

    if (likeCard) {
      return res.status(200).send(likeCard);
    }
    throw new ErrorNotFound('Такой карточки нет');
  } catch (error) {
    return next(error);
  }
};

const unLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const unlikeCard = await Card.findByIdAndUpdate(id,
      { $pull: { likes: req.user.id } },
      { new: true });
    if (unlikeCard) {
      return res.status(200).send(unlikeCard);
    }
    throw new ErrorNotFound('Такой карточки нет');
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user.id;
    const card = await Card.create({ name, link, owner: ownerId });
    return res.status(200).send(card);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getCards, createCard, deleteCard, addLike, unLike,
};
