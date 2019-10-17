import { prop, sortBy } from 'ramda';
import { ActionTypes } from './constants';

const root = state => state.messages

const byConversationIdRoot = state => root(state).idsByConversationId
const byIdRoot = state => root(state).byId

export const firstConversationId = state => Object.keys(byConversationIdRoot(state))[0]
export const messagesNeverFetched = (state, conversationId) => !byConversationIdRoot(state)[conversationId]
export const messagesFetchPending = (state, conversationId) => (byConversationIdRoot(state)[conversationId] || {}).status === ActionTypes.FETCH_MESSAGES_PENDING;
export const conversationMessageIds = (state, conversationId) => [...(byConversationIdRoot(state)[conversationId] || { data: new Set()}).data]

export const getMessage = (state, messageId) => byIdRoot(state)[messageId];


const shouldCreateNewGroup = (lastMessage, currentMessage) => {
  const lastMsgCreatedAt = Date.parse(`${lastMessage.created_at}Z`);
  const currentMsgCreatedAt = Date.parse(`${currentMessage.created_at}Z`);

  const differentAuthor = lastMessage.author_id !== currentMessage.author_id && lastMessage.author_type !== currentMessage.author_type;
  const newDay = (new Date(lastMsgCreatedAt).getDate()) !== (new Date(currentMsgCreatedAt).getDate());
  const moreThan5Minutes = currentMsgCreatedAt - lastMsgCreatedAt > (1000 * 60 * 5);
  const differentMsgType = lastMessage.message_type !== currentMessage.message_type;

  return differentAuthor || newDay || moreThan5Minutes || differentMsgType;
}


export const getMessageGroups = (state, conversationId) => {
  const unorderedMessages = conversationMessageIds(state, conversationId).map(id => getMessage(state, id));
  const orderedMessages = sortBy(prop('created_at'), unorderedMessages);

  const groups = [];
  let currentGroup = [];

  orderedMessages.forEach(msg => {
    if (currentGroup.length === 0) {
      currentGroup.push(msg);
    } else if (shouldCreateNewGroup(currentGroup[currentGroup.length - 1], msg)) {
      groups.push(currentGroup);
      currentGroup = [msg];
    } else {
      currentGroup.push(msg);
    }
  });

  groups.push(currentGroup);

  return groups;
};