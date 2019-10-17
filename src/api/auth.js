import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';


export const AuthAPI = {
  loginViaEmail(email, password) {
    return fetch(`${API_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password }}),
    })
  },

  signupViaEmail(email, password) {
    return fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password }}),
    })
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

}