import { useState, useEffect } from 'react';
import api from '../utils/Api.js';
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
import { register, authorize, getUserData } from '../utils/AuthApi.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

export default function App() {

  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
  });
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
    getUserData(token).then(userData => {
      setUserData(userData && userData.data);
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
    setUserData({
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
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const promise = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
    promise.then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(error => console.log(`Ошибка лайка и дизлайка: ${error}`));
  });

  const handleCardDelete = ((cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardId));
    })
      .catch(error => console.log(`Ошибка при удалении карточки: ${error}`));
  });

  const handleUpdateUser = ((userProfile) => {
    api.changeUserProfile(userProfile).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка обновления профиля пользователя: ${error}`));
  });

  const handleUpdateAvatar = (({ avatar }) => {
    api.changeAvatar(avatar).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка обновления аватара: ${error}`));
  });

  const handleAddPlaceSubmit = ((card) => {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch(error => console.log(`Ошибка добавления новой карточки: ${error}`));
  });

  useEffect(() => {
    api.getUserProfile().then(user => {
      setCurrentUser(user);
    })
      .catch(error => console.log(`Ошибка загрузки профиля пользователя: ${error}`));
  }, []);

  useEffect(() => {
    api.getInitialCards().then(cards => {
      setCards(cards);
    })
      .catch(error => console.log(`Ошибка загрузки начальных карточек: ${error}`));
  }, []);

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
        <Header
          userData={userData}
          signOut={signOut}
        />
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
