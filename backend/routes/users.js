const router = require('express').Router(); // создали роутер
const {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');
const { validateProfileData, validateAvatarData, validateUserIdParam } = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:userId', validateUserIdParam, getUserById);

router.patch('/me', validateProfileData, updateProfile);
router.patch('/me/avatar', validateAvatarData, updateAvatar);

module.exports = router; // экспортировали роутер
