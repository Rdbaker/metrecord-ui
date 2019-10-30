import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import * as ChartActions from './actions';
import { ActionTypes } from './constants';
import { ChartsAPI } from 'api/charts';

const fetchChart$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_CHART),
  pluck('payload'),
  flatMap(({ id }) =>
    from(ChartsAPI.fetchChart(id))
      .pipe(
        map((chart) => ChartActions.fetchChartSuccess(id, chart)),
        catchError(err => of(ChartActions.fetchChartFailed(id, err))),
        startWith(ChartActions.fetchChartPending(id))
      )
  )
);


export default combineEpics(
  fetchChart$,
)
