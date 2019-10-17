import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, mergeMap, map } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { path } from 'ramda';

import { ActionTypes as OrgActionTypes } from 'modules/org/constants';
import { MessagesAPI } from 'api/messages';
import * as MessageActions from './actions';
import { ActionTypes } from './constants';
import { createBeforeServerMessage } from 'utils/messages';


const fetchOrgToFetchMessages = action$ => action$.pipe(
  ofType(OrgActionTypes.FETCH_ORG_SUCCESS),
  mergeMap(({ payload: { org: { conversations } } }) => conversations.map(conv => MessageActions.fetchMessages({ conversationId: conv.id }))),
)

const fetchMessagesEpic = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_MESSAGES),
  pluck('payload'),
  flatMap(({ conversationId, before }) =>
    from(MessagesAPI.getConversationMessages(conversationId, before))
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ data }) => of(MessageActions.fetchMessagesSuccess({ conversationId, messages: data }))),
        catchError(err => of(MessageActions.fetchMessagesFailed({ conversationId, err }))),
        startWith(MessageActions.fetchMessagesPending({ conversationId })),
      )
  )
)


const sendMessage = (action$, store$) => action$.pipe(
  ofType(ActionTypes.SEND_MESSAGE),
  pluck('payload'),
  map(createBeforeServerMessage),
  flatMap((message) =>
    from(MessagesAPI.sendMessage(message.conversation_id, message, path(['auth', 'jwt', 'data'], store$.value)))
      .pipe(
        flatMap((response) => from(response.json())),
        flatMap(({ data }) => of(MessageActions.sendMessageSuccess({ conversationId: message.conversation_id, message: data }))),
        catchError(err => of(MessageActions.sendMessageFailed({ conversationId: message.conversation_id, err, message }))),
        startWith(MessageActions.sendMessagePending({ conversationId: message.conversation_id, message })),
      )
  )
)


export default combineEpics(
  sendMessage,
  fetchOrgToFetchMessages,
  fetchMessagesEpic,
)