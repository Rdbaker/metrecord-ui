export const createBeforeServerMessage = ({
  conversationId,
  attributes = {},
  user_context = {},
  event = {},
  ...rest
}, extraUserContext = {}) => ({
  conversation_id: conversationId,
  event,
  user_context: {
    ...extraUserContext,
    ...user_context,
  },
  attributes: {
    client_timestamp: Date.now(),
    sentFromAdmin: true,
    ...attributes,
  },
  ...rest,
});