const router = require('express').Router(); // создали роутер
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCreateCardData, validateCardIdParam } = require('../middlewares/validate');

router.get('/', getCards);

router.post('/', validateCreateCardData, createCard);

router.delete('/:cardId', validateCardIdParam, deleteCard);
router.delete('/:cardId/likes', validateCardIdParam, dislikeCard);
router.put('/:cardId/likes', validateCardIdParam, likeCard);

module.exports = router; // экспортировали роутер
