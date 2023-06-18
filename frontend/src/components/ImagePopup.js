export default function ImagePopup({ card, onClose }) {
  const isOpen = Object.keys(card).length !== 0 ? 'popup_opened' : '';

  return (
    <div className={`popup popup_type_image ${isOpen}`}>
      <div className="popup__card">
        <img className="popup__card-image" src={card.link} alt={card.name} />
        <h2 className="popup__card-name">{card.name}</h2>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button selectable-white"
          aria-label="Кнопка закрытия попап с картинкой">
        </button>
      </div>
    </div>
  )
}
