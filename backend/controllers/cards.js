const Card = require('../models/card');
const ErrorNotFound = require('../errors/errorNotFound');

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
    if (card) {
      await Card.deleteOne(card);
      return res.status(200).send({ message: 'Карточка удалена' });
    }
    throw new ErrorNotFound('Пользователь c таким id не найден');
  } catch (error) {
    return next(error);
  }
};

const addLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const likeCard = await Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } },
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
    const { cardId } = req.params;
    const unlikeCard = await Card.findByIdAndUpdate(cardId,
      { $pull: { likes: req.user._id } },
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
    const { name, link, id } = req.body;
    const ownerId = id;
    const card = await Card.create({ name, link, owner: ownerId });
    return res.status(200).send(card);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getCards, createCard, deleteCard, addLike, unLike,
};
