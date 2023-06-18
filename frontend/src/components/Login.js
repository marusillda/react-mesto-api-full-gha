import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function Login({ loginUser, buttonText }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginUser(values);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__field"
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
          className="login__field"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          autoComplete="current-password"
          value={values.password || ''}
          required
        />
        <span className="popup__error profile-name-error">
          {errors.password}
        </span>
        <button
          disabled={!isValid}
          type="submit"
          className="login__submit-button selectable-white"
          aria-label={`Кнопка ${buttonText}`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}
