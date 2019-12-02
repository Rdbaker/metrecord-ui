import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/http';


export const UsersAPI = {
  getAllOrgUsers() {
    return fetch(`${API_URL}/api/users/my_org`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  updateMyPaymentInfo(token) {
    return fetch(`${API_URL}/api/users/payment-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ token }),
    })
    .then(checkStatus)
  }
};