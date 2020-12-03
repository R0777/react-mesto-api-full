const router = require('express').Router();
const {
  getUser, getUsers, getMe, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMe);
router.patch('/users/me/avatar', updateUserAvatar);
router.get('/users/:id', getUser);

module.exports = router;
