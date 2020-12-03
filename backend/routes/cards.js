const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLike, unLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.put('/cards/likes/:id', addLike);
router.delete('/cards/likes/:id', unLike);

module.exports = router;
