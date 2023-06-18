import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function Register({ registerUser, buttonText }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation()

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(values);
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__field"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <span className="popup__error profile-name-error">
          {errors.email}
        </span>
        <input
          className="register__field"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength={3}
          value={values.password || ''}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <span className="popup__error profile-name-error">
          {errors.password}
        </span>
        <button
          disabled={!isValid}
          type="submit"
          className="register__submit-button selectable-white"
          aria-label={`Кнопка ${buttonText}`}
        >
          {buttonText}
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-link">Уже зарегистрированы? </p>
        <Link to="/sign-in" className="register__signin-link selectable-white">Войти</Link>
      </div>
    </div>
  )
}
