import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';


export const OrgsAPI = {
  updateSettingProperty(name, value, type='string') {
    return fetch(`${API_URL}/api/org_properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ value, type, name }),
    })
  },

  getMyOrg() {
    return fetch(`${API_URL}/api/orgs/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
  },

  patchGate(orgId, gateName, enabled) {
    return fetch(`${API_URL}/orgs/${orgId}/gates/${gateName}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        value: enabled,
      })
    })
  }
}