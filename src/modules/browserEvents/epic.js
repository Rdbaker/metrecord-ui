import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { EventsAPI } from 'api/events';
import * as BrowserEventActions from './actions';
import { ActionTypes } from './constants';


const fetchBrowserMinuteSummary$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY),
  pluck('payload'),
  flatMap(({ start, end }) =>
    from(EventsAPI.browserMinute(start, end))
      .pipe(
        map(({ data }) => BrowserEventActions.fetchBrowserMinuteSummarySuccess(data)),
        catchError(err => of(BrowserEventActions.fetchBrowserMinuteSummaryFailed(err))),
        startWith(BrowserEventActions.fetchBrowserMinuteSummaryPending())
      )
  )
);


export default combineEpics(
  fetchBrowserMinuteSummary$,
)
