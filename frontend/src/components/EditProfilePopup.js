import { useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation()

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = ((e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  });

  useEffect(() => {
    setValues({
      name: currentUser.name || '',
      about: currentUser.about || '',
    })
    // eslint-disable-next-line
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <input
        type="text"
        id="profile-name"
        value={values.name || ''}
        name="name"
        className="popup__field"
        placeholder="Имя"
        required
        minLength={2}
        maxLength={15}
        onChange={handleChange}
      />
      <span className="popup__error profile-name-error">
        {errors.name}
      </span>
      <input
        type="text"
        id="profile-about"
        value={values.about || ''}
        name="about"
        className="popup__field"
        placeholder="Профессия"
        required
        minLength={2}
        maxLength={30}
        onChange={handleChange}
      />
      <span className="popup__error profile-about-error">
        {errors.about}
      </span>
    </PopupWithForm>
  )
}
