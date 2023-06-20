import { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import {
  register,
  authorize,
  likeCard,
  unlikeCard,
  deleteCard,
  changeUserProfile,
  changeAvatar,
  addNewCard,
  getUserProfile,
  getInitialCards
} from '../utils/AuthApi.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

export default function App() {

  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
  });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //Флаг окончания загрузки из LocalStorage
  const [isLocalStorageRead, setIsLocalStorageRead] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipType, setTooltipType] = useState(false);


  const registerUser = ({ email, password }) => {
    register(email, password)
      .then((res) => {
        setRegistrationStatus(true);
      })
      .catch((error) => {
        console.log(`Ошибка регистрации пользователя: ${error}`);
        setRegistrationStatus(false);
      })
      .finally(() => {
        setIsRegistered(true);
      });
  }

  const loginUser = ({ password, email }) => {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setToken(res.token);
      })
      .catch((error) => {
        console.log(`Ошибка авторизации пользователя: ${error}`);
        setIsLoginFailed(true);
      })
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsLocalStorageRead(true);
  }, [])

  useEffect(() => {
    if (!token) {
      // Окончание загрузки только после окончания чтения из LocalStorage для предотвращения "мигания"
      isLocalStorageRead && setIsLoading(false);
      return;
    }
    getUserProfile(token).then(user => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate('/', { replace: true });
    })
      .catch(error => {
        console.log(`Ошибка проверки токена: ${error}`);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate, isLocalStorageRead])

  useEffect(() => {
    setIsTooltipOpen(isLoginFailed);
    setTooltipType(false);
  }, [isLoginFailed]);

  useEffect(() => {
    setIsTooltipOpen(isRegistered);
    setTooltipType(registrationStatus);
    // eslint-disable-next-line
  }, [isRegistered]);

  const signOut = (() => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser({
      _id: "",
      email: "",
    });
    navigate('/sign-in', { replace: true });
  })

  const handleRegisterTooltipClose = () => {
    if (isRegistered && registrationStatus) {
      navigate('/', { replace: true });
    }
    setIsRegistered(false);
  }

  const handleCardLike = ((card) => {
    const isLiked = card.likes.some(id => id === currentUser._id);
    const promise = isLiked ? unlikeCard(card._id, token) : likeCard(card._id, token);
    promise.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(error => console.log(`Ошибка лайка и дизлайка: ${error}`));
  });

  const handleCardDelete = ((cardId) => {
    deleteCard(cardId, token).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardId));
    })
      .catch(error => console.log(`Ошибка при удалении карточки: ${error}`));
  });

  const handleUpdateUser = ((userProfile) => {
    changeUserProfile(userProfile, token).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка обновления профиля пользователя: ${error}`));
  });

  const handleUpdateAvatar = (({ avatar }) => {
    changeAvatar(avatar, token).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка обновления аватара: ${error}`));
  });

  const handleAddPlaceSubmit = ((card) => {
    addNewCard(card, token).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка добавления новой карточки: ${error}`));
  });

  useEffect(() => {
    if (!token) {
      return;
    }
    getInitialCards(token).then(cards => {
      setCards(cards);
    })
      .catch(error => console.log(`Ошибка загрузки начальных карточек: ${error}`));
  }, [token]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsLoginFailed(false);
    handleRegisterTooltipClose();
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isTooltipOpen || selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
    // eslint-disable-next-line
  }, [isOpen]);

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header signOut={signOut} />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              loggedIn={isLoggedIn}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              element={Main}
            />
          } />
          <Route path="/sign-up" element={
            <Register
              registerUser={registerUser}
              buttonText="Зарегистрироваться"
            />} />
          <Route path="/sign-in" element={
            <Login
              loginUser={loginUser}
              buttonText="Войти"
            />} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        {isTooltipOpen && (<InfoTooltip type={tooltipType} onClose={closeAllPopups} />)}
      </div >
    </CurrentUserContext.Provider>
  );
}
