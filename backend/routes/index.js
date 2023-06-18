const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateRegistrationData, validateLoginData } = require('../middlewares/validate');
const notFoundPath = require('../middlewares/notFoundPath');

router.post('/signup', validateRegistrationData, createUser);
router.post('/signin', validateLoginData, loginUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use(notFoundPath);

module.exports = router;
