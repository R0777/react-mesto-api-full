const router = require('express').Router();

const {
  getUser, getUsers, getMe, updateUserAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.patch('/users/me/avatar', updateUserAvatar);

router.patch('/users/me/', updateUser);

router.get('/users/:id', getUser);

module.exports = router;
