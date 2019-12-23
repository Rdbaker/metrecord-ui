import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
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

const fetchAjaxSummary$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_AJAX_SUMMARY),
  pluck('payload'),
  flatMap(({ start, end }) =>
    from(EventsAPI.fetchAjaxSeries(start, end, end - start >= tenThousandMinutes ? 'hour' : 'minute'))
      .pipe(
        map(({ data }) => BrowserEventActions.fetchAjaxSummarySuccess(data)),
        catchError(err => of(BrowserEventActions.fetchAjaxSummaryFailed(err))),
        startWith(BrowserEventActions.fetchAjaxSummaryPending())
      ),
  )
);

const fetchAjaxPoints$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_AJAX_SUMMARY),
  pluck('payload'),
  flatMap(({ start, end }) =>
    from(EventsAPI.fetchAjaxPoints(start, end, end - start >= tenThousandMinutes ? 'hour' : 'minute'))
      .pipe(
        map(({ data }) => BrowserEventActions.fetchAjaxPointsSuccess(data)),
        catchError(err => of(BrowserEventActions.fetchAjaxPointsFailed(err))),
        startWith(BrowserEventActions.fetchAjaxPointsPending())
      ),
  )
);


export default combineEpics(
  fetchBrowserSummary$,
  fetchAjaxSummary$,
  fetchAjaxPoints$,
)
