import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/http';


export const AuthAPI = {
  loginViaEmail(email, password) {
    return fetch(`${API_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password }}),
    })
    .then(checkStatus)
  },

  signupViaEmail(email, password, name, orgName) {
    return fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password, name }, org: { name: orgName }}),
    })
    .then(checkStatus)
  },

  getMe() {
    return fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
  },

  verifyUser(token) {
    return fetch(`${API_URL}/api/users/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(checkStatus)
  },

  reportFalseEmail(userId) {
    return fetch(`${API_URL}/api/users/report-false-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    .then(checkStatus)
  }
}
