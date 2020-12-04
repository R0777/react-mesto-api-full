const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLike, unLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/likes', addLike);
router.delete('/cards/likes', unLike);

module.exports = router;
