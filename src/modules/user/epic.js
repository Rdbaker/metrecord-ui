import { ofType, combineEpics } from 'redux-observable';
import { flatMap, catchError, pluck, map, filter } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { EndUsersAPI } from 'api/endUsers';
import { ActionTypes as MessageActionTypes } from 'modules/messages/constants';
import * as UserActions from 'modules/user/actions';


const maybeFetchEndUsersForMessages = action$ => action$.pipe(
  ofType(MessageActionTypes.FETCH_MESSAGES_SUCCESS),
  pluck('payload', 'messages'),
  map((messages) => messages.filter(({ author_type }) => author_type === 'END_USER').map(({ author_id }) => author_id)),
  filter(authorIds => authorIds.length !== 0),
  flatMap(authorIds => (
    from(EndUsersAPI.bulkGet(authorIds))
      .pipe(
        flatMap(res => from(res.json())),
        flatMap(({ data }) => of(UserActions.bulkGetEndUsersSuccess(data))),
        catchError(err => of(UserActions.bulkGetEndUsersSuccess(err)))
      )
  ))
);

export default combineEpics(
  maybeFetchEndUsersForMessages,
)