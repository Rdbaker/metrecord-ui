import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import * as EndUsersActions from './actions';
import { ActionTypes } from './constants';
import { EndUsersAPI } from 'api/endUsers';


const fetchEventsForEndUser$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_END_USER_EVENTS),
  pluck('payload'),
  flatMap(({ endUserId, before }) =>
    from(EndUsersAPI.fetchEndUserData(endUserId, before))
      .pipe(
        map(({ data }) => EndUsersActions.fetchEndUserEventsSuccess(endUserId, before, data)),
        catchError(err => of(EndUsersActions.fetchEndUserEventsFailed(endUserId, before, err))),
        startWith(EndUsersActions.fetchEndUserEventsPending(endUserId, before))
      )
  )
);


export default combineEpics(
  fetchEventsForEndUser$,
)
