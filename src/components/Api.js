class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getRequest(url, options) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    return this._getRequest(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._getRequest(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  editUserProfile(name, about) {
    return this._getRequest(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addCard(name, link) {
    return this._getRequest(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._getRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  addLike(cardId) {
    return this._getRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  removeLike(cardId) {
    return this._getRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  editUserAvatar(avatar) {
    return this._getRequest(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: 'f0dba71b-d2b0-43ce-9b43-97ba5085a42c',
    'Content-Type': 'application/json',
  },
});
