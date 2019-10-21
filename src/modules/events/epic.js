import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { EventsAPI } from 'api/events';
import * as EventActions from './actions';
import { ActionTypes } from './constants';

const fetchNameTypeahead$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_NAME_TYPEAHEAD),
  pluck('payload'),
  flatMap(({ name }) =>
    from(EventsAPI.nameTypeahead(name))
      .pipe(
        map(({ data }) => EventActions.fetchNameTypeaheadSuccess(name, data)),
        catchError(err => of(EventActions.fetchNameTypeaheadFailed(name, err))),
        startWith(EventActions.fetchNameTypeaheadPending(name))
      )
  )
);


export default combineEpics(
  fetchNameTypeahead$,
)
