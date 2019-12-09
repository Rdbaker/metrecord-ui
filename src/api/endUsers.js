import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';
import { checkStatus } from 'utils/http';


export const EndUsersAPI = {
  paginateEndUsers() {
    return fetch(`${API_URL}/api/end_users/fake_paginate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },

  fetchEndUserData(endUserId, before) {
    return fetch(`${API_URL}/api/end_users/${endUserId}/events?${before && `before=${before}`}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
    .then(checkStatus)
  },
}