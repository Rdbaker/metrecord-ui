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
  },

  browserHour(start, end) {
    return fetch(`${API_URL}/api/browser/performance/hour?start_date=${start.toISOString()}&end_date=${end.toISOString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  hasAny() {
    return fetch(`${API_URL}/api/events/has_any`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  nameTypeahead(name) {
    return fetch(`${API_URL}/api/events/typeahead?name=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchCount(name, start, end) {
    return fetch(`${API_URL}/api/events/${name}/count?start_date=${start.toISOString()}&end_date=${end.toISOString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchSeries(name, start, end, interval) {
    return fetch(`${API_URL}/api/events/${name}/series?start_date=${start.toISOString()}&end_date=${end.toISOString()}&interval=${interval}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchAjaxSeries(start, end, interval) {
    return fetch(`${API_URL}/api/ajax/series?start_date=${start.toISOString()}&end_date=${end.toISOString()}&interval=${interval}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchAjaxPoints(start, end, interval) {
    return fetch(`${API_URL}/api/ajax/points?start_date=${start.toISOString()}&end_date=${end.toISOString()}&interval=${interval}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchEvent(id) {
    return fetch(`${API_URL}/api/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchPageLoadsSummary(start, end) {
    return fetch(`${API_URL}/api/events/pageLoads/summary?start_date=${start.toISOString()}&end_date=${end.toISOString()}&interval=year`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)

  }
}
