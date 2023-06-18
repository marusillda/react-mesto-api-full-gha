import { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  const handleSubmit = ((e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.link,
    });
  });

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <input
        type="url"
        id="avatar-link"
        name="link"
        className="popup__field"
        placeholder="Ссылка на картинку"
        value={values.link || ''}
        onChange={handleChange}
        required
      />
      <span className="popup__error profile-name-error">
        {errors.link}
      </span>
    </PopupWithForm>
  )
}
