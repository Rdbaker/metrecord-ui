import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';


export const SettingsAPI = {
  updateThemeProperty({ name, value, type = 'STRING' }) {
    return fetch(`${API_URL}/orgs/theme/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        value,
        type,
      })
    })
  },
}