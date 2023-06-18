import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function AddPlacePopup({ onAddPlace, isOpen, onClose, }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  const handleSubmit = ((e) => {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    })
  });

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <input
        type="text"
        id="card-name"
        name="name"
        className="popup__field"
        placeholder="Название"
        required
        minLength={2}
        maxLength={20}
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__error card-name-error">
        {errors.name}
      </span>
      <input
        type="url"
        id="card-link"
        name="link"
        className="popup__field"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="popup__error card-link-error">
        {errors.link}
      </span>
    </PopupWithForm>
  )
}
