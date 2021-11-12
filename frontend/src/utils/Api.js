class Api {
  constructor (config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }


  getUserInfo () {
    return fetch (`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  }


  getInitialCards () {
    return fetch (`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  }

  editProfileInfo (data) {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  }

  editUserAvatar (avatarUrl) {
    return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  }

  loadNewCard(card) {
    return fetch (`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  }

  changeLikeCardStatus (cardId, isLiked) {
    return fetch (`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  } 

  deleteCard (cardId) {
    return fetch (`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then ((res) => {
        return this._checkResponse(res)
      })
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({url: 'https://nomoreparties.co/v1/cohort-26', 
  headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
            'Content-Type': 'application/json'}
});

export default api;