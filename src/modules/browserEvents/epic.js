import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { EventsAPI } from 'api/events';
import * as BrowserEventActions from './actions';
import { ActionTypes } from './constants';

const tenThousandMinutes = 1000 * 60 * 10000;

const fetchBrowserSummary$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_BROWSER_SUMMARY),
  pluck('payload'),
  flatMap(({ start, end }) =>
    from(end - start >= tenThousandMinutes ? EventsAPI.browserHour(start, end) : EventsAPI.browserMinute(start, end))
      .pipe(
        map(({ data }) => BrowserEventActions.fetchBrowserSummarySuccess(data)),
        catchError(err => of(BrowserEventActions.fetchBrowserSummaryFailed(err))),
        startWith(BrowserEventActions.fetchBrowserSummaryPending())
      )
  )
);


export default combineEpics(
  fetchBrowserSummary$,
)
