import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/http';


export const DashboardsAPI = {
  createDashboard(data) {
    return fetch(`${API_URL}/api/dashboards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ dashboard: data }),
    })
    .then(checkStatus)
  },

  fetchDashboard(id) {
    return fetch(`${API_URL}/api/dashboards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },
};