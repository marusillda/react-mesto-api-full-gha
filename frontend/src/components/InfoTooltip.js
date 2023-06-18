export default function InfoTooltip({ type = true, onClose }) {
  const toolTipTitle = type ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.';
  const toolTipImageError = type ? '' : 'popup__tooltip-image_error';

  return (
    <div className={`popup popup_opened`} >
      <div className="popup__container">
        <div className={`popup__tooltip-image ${toolTipImageError}`} />
        <p className="popup__tooltip-title">{toolTipTitle}</p>
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
