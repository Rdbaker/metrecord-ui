import { API_URL } from 'constants/resources';
import { getToken } from 'utils/auth';


export const MessagesAPI = {
  getConversationMessages(conversationId, before) {
    let url = `${API_URL}/api/conversations/${conversationId}/messages`;
    if (before) {
      url += `?before=${before}`;
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    })
  },

  sendMessage(conversationId, message) {
    return fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ message })
    });
  }
}