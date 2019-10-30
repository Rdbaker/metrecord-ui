import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/http';


export const ChartsAPI = {
  createChart(data) {
    return fetch(`${API_URL}/api/charts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ chart: data }),
    })
    .then(checkStatus)
  },

  fetchChart(id) {
    return fetch(`${API_URL}/api/charts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  }
};