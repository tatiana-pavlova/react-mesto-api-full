export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
    body: JSON.stringify({password, email})
  })
    .then((res) => _checkResponse(res))
    .then ((data) => {
      if (data.token) {
        localStorage.setItem ('jwt', data.token);
        return data;
      } else {
        return;
      }
    })
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
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