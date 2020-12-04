import { getToken } from './token';

class Api {
  
  constructor({
    url,
    headers,
  }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Опаньки, ошибка: ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  setCard(place, link, userId) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link,
        id: userId,
      }),
    })
      .then((el) => this._getResponseData(el));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  addLike(id, userId) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        userId
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  unLike(id, userId) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        userId
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  setProfile(name, about, userId) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
        id: userId,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  profileAvatar(avalink, userId) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avalink,
        id: userId,
      }),
    })
      .then((res) => this._getResponseData(res));
  }
}
const token = getToken();
const api = new Api({
  url: 'https://api.r777.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`
  },
});

export { api };
