import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/http';


export const EventsAPI = {
  browserMinute(start, end) {
    return fetch(`${API_URL}/api/browser/performance/minute?start_date=${start.toISOString()}&end_date=${end.toISOString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  }
}
