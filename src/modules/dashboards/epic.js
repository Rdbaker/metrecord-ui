import { ofType, combineEpics } from 'redux-observable';
import { flatMap, startWith, catchError, pluck, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import * as DashboardActions from './actions';
import { ActionTypes } from './constants';
import { DashboardsAPI } from 'api/dashboards';


const addChartToDash$ = action$ => action$.pipe(
  ofType(ActionTypes.ADD_CHART_TO_DASHBOARD),
  pluck('payload'),
  flatMap(({ chartId, dashboardId }) =>
    from(DashboardsAPI.addChartToDashboard(dashboardId, chartId))
      .pipe(
        map((hydratedDashboard) => DashboardActions.addChartToDashboardSuccess({ dashboardId, chartId, hydratedDashboard })),
        catchError(err => of(DashboardActions.addChartToDashboardFailed({ dashboardId, chartId, err }))),
        startWith(DashboardActions.addChartToDashboardPending({ chartId, dashboardId }))
      )
  )
);

const removeChartFromDash$ = action$ => action$.pipe(
  ofType(ActionTypes.REMOVE_CHART_FROM_DASHBOARD),
  pluck('payload'),
  flatMap(({ chartId, dashboardId }) =>
    from(DashboardsAPI.removeChartFromDashboard(dashboardId, chartId))
      .pipe(
        map(hydratedDashboard => DashboardActions.removeChartFromDashboardSuccess({ dashboardId, chartId, hydratedDashboard })),
        catchError(err => of(DashboardActions.removeChartFromDashboardFailed({ dashboardId, chartId, err }))),
        startWith(DashboardActions.removeChartFromDashboardPending({ chartId, dashboardId })),
      )
  )
);


const fetchHydratedDash$ = action$ => action$.pipe(
  ofType(ActionTypes.FETCH_HYDRATED_DASHBOARD),
  pluck('payload'),
  flatMap(({ dashboardId }) =>
    from(DashboardsAPI.fetchHydratedDashboard(dashboardId))
      .pipe(
        map((hydratedDashboard) => DashboardActions.fetchHydratedDashboardSuccess({ dashboardId, hydratedDashboard })),
        catchError(err => of(DashboardActions.fetchHydratedDashboardFailed({ dashboardId, err }))),
        startWith(DashboardActions.fetchHydratedDashboardPending({ dashboardId }))
      )
  )
);



export default combineEpics(
  addChartToDash$,
  fetchHydratedDash$,
  removeChartFromDash$,
)
