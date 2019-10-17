import { ActionTypes } from './constants';


export const fetchMessages = ({ conversationId, before }) => ({
  type: ActionTypes.FETCH_MESSAGES,
  payload: { conversationId, before },
})

export const fetchMessagesPending = ({ conversationId }) => ({
  type: ActionTypes.FETCH_MESSAGES_PENDING,
  payload: { conversationId },
})

export const fetchMessagesSuccess = ({ conversationId, messages }) => ({
  type: ActionTypes.FETCH_MESSAGES_SUCCESS,
  payload: { conversationId, messages },
})

export const fetchMessagesFailed = ({ conversationId, err }) => ({
  type: ActionTypes.FETCH_MESSAGES_FAILED,
  payload: { conversationId, err },
})


export const sendMessage = ({ conversationId, body }) => ({
  type: ActionTypes.SEND_MESSAGE,
  payload: { conversationId, body },
})

export const sendMessagePending = ({ conversationId, message }) => ({
  type: ActionTypes.SEND_MESSAGE_PENDING,
  payload: { conversationId, message },
})

export const sendMessageFailed = ({ conversationId, message, err }) => ({
  type: ActionTypes.SEND_MESSAGE_FAILED,
  payload: { conversationId, message, err },
})

export const sendMessageSuccess = ({ conversationId, message }) => ({
  type: ActionTypes.SEND_MESSAGE_SUCCESS,
  payload: { conversationId, message },
})
