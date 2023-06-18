
export default function PopupWithForm({ name, title, children, buttonText, onSubmit, isOpen, onClose, disabled }) {
  const isOpenClassName = isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_type_${name} ${isOpenClassName}`} >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            disabled={disabled}
            type="submit"
            className="popup__submit-button selectable-black"
            aria-label={`Кнопка ${buttonText}`}
          >
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button selectable-white"
          aria-label="Кнопка закрытия окна"
        >
        </button>
      </div>
    </div>
  )
}
