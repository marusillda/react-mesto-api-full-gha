import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button-fill'}`
  );
  return (
    <article className="element">
      <img className="element__photo" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
      {isOwn && <button
        type="button"
        className="element__trash"
        aria-label="Кнопка Удалить карточку"
        onClick={() => onCardDelete(card._id)}>
      </button>}
      <div className="element__capture-like">
        <h2 className="element__capture">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Кнопка Поставить лайк"
            onClick={() => onCardLike(card)}
          >
          </button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
