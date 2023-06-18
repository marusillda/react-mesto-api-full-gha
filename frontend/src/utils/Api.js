import {
  baseUrl,
  authorization
 } from './constants.js';

class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при выполнении запроса: ${res.status}`);
  }

  /**
   * Запрос списка начальных карточек
   */
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос данных пользователя
   */
  getUserProfile() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос на изменение данных пользователя
   * @param {Object} userProfile
   */
  changeUserProfile(userProfile) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(userProfile)
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос на создание новой карточки
   * @param {Object} card
   */
  addNewCard(card) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(card)
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос на удаление карточки
   * @param {String} cardId
   */
  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос на добавление лайка карточке
   * @param {String} cardId
   */
  likeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос на снятие лайка с карточки
   * @param {String} cardId
   */
  unlikeCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._options.headers.authorization
      }
    })
      .then(this._checkResponse);
  }

  /**
   * Запрос на изменение аватара
   * @param {String} avatar
   */
  changeAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ avatar })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl,
  headers: {
    authorization,
    'Content-Type': 'application/json'
  }
});

export default api;
