import { produce } from 'immer';

import { ActionTypes } from 'modules/messages/constants';


const defaultState = {
  idsByConversationId: {},
  byId: {},
};

const fetchMessagesPending = (newState, { conversationId }) => {
  const alreadyHasMessageInState = !!newState.idsByConversationId[conversationId];
  if (!alreadyHasMessageInState) {
    newState.idsByConversationId[conversationId] = {
      status: ActionTypes.FETCH_MESSAGES_PENDING,
      data: new Set(),
    };
  } else {
    newState.idsByConversationId[conversationId].status = ActionTypes.FETCH_MESSAGES_PENDING;
  }
  return newState;
}

const fetchMessagesSuccess = (newState, { conversationId, messages }) => {
  const idsForConversation = newState.idsByConversationId[conversationId].data;
  messages.forEach(message => idsForConversation.add(message.id));
  messages.forEach(message => newState.byId[message.id] = message);
  newState.idsByConversationId[conversationId].status = ActionTypes.FETCH_MESSAGES_SUCCESS;

  return newState;
}

const receiveMessage = (newState, message) => {
  const conversationId = message.conversation_id;
  const alreadyHasMessageInState = !!newState.idsByConversationId[conversationId];
  if (!alreadyHasMessageInState) {
    const data = new Set();
    data.add(message.id);
    newState.idsByConversationId[conversationId] = {
      status: ActionTypes.RECEIVE_MESSAGE,
      data,
    };
    newState.byId[message.id] = message
  } else {
    newState.idsByConversationId[conversationId].data.add(message.id);
    newState.idsByConversationId[conversationId].status = ActionTypes.RECEIVE_MESSAGE;
    newState.byId[message.id] = message;
  }

  return newState;

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES_PENDING:
      return produce(state, draftState => fetchMessagesPending(draftState, action.payload));
    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return produce(state, draftState => fetchMessagesSuccess(draftState, action.payload));
    case ActionTypes.RECEIVE_MESSAGE:
      return produce(state, draftState => receiveMessage(draftState, action.payload));
    default:
      return state;
  }
};