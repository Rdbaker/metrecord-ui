import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/api';


export const EndUsersAPI = {
  bulkGet(ids) {
    return fetch(`${API_URL}/api/end_users?${ids.map(id => `ids[]=${id}&`).join('')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  }
}