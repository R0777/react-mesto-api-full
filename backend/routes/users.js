const router = require('express').Router();
const { getUser, getUsers, getMe } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMe);
router.get('/users/:id', getUser);

module.exports = router;
