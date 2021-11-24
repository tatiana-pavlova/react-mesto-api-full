// export const BASE_URL = "https://auth.nomoreparties.co";

// export const BASE_URL = "https://api.mesto.tatianapavlova.nomoredomains.rocks";
export const BASE_URL = "http://localhost:4000";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
    .then((res) => _checkResponse(res))
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
    .then((res) => _checkResponse(res))
}

export const unauthorize = () => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .catch(err => console.log(err));
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then((res) => _checkResponse(res))
  .then(data => data)
}

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}