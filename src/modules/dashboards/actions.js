import { ActionTypes } from './constants';

export const receiveDashboards = dashes => ({
  type: ActionTypes.RECEIVE_DASHBOARDS,
  payload: { dashboards: dashes }
});

export const receiveDashboard = dash => ({
  type: ActionTypes.RECEIVE_DASHBOARD,
  payload: { dashboard: dash }
});

export const addChartToDashboard = ({ dashboardId, chartId }) => ({
  type: ActionTypes.ADD_CHART_TO_DASHBOARD,
  payload: { dashboardId, chartId }
});

export const addChartToDashboardPending = ({ dashboardId, chartId }) => ({
  type: ActionTypes.ADD_CHART_TO_DASHBOARD_PENDING,
  payload: { dashboardId, chartId }
});

export const addChartToDashboardSuccess = ({ dashboardId, chartId, hydratedDashboard }) => ({
  type: ActionTypes.ADD_CHART_TO_DASHBOARD_SUCCESS,
  payload: { dashboardId, chartId, hydratedDashboard }
});

export const addChartToDashboardFailed = ({ dashboardId, chartId, err }) => ({
  type: ActionTypes.ADD_CHART_TO_DASHBOARD_FAILED,
  payload: { dashboardId, chartId, err }
});

export const fetchHydratedDashboard = ({ dashboardId }) => ({
  type: ActionTypes.FETCH_HYDRATED_DASHBOARD,
  payload: { dashboardId },
});

export const fetchHydratedDashboardPending = ({ dashboardId }) => ({
  type: ActionTypes.FETCH_HYDRATED_DASHBOARD_PENDING,
  payload: { dashboardId },
});

export const fetchHydratedDashboardFailed = ({ dashboardId, err }) => ({
  type: ActionTypes.FETCH_HYDRATED_DASHBOARD_FAILED,
  payload: { dashboardId, err },
});

export const fetchHydratedDashboardSuccess = ({ dashboardId, hydratedDashboard }) => ({
  type: ActionTypes.FETCH_HYDRATED_DASHBOARD_SUCCESS,
  payload: { dashboardId, hydratedDashboard },
});

export const removeChartFromDashboard = ({ dashboardId, chartId }) => ({
  type: ActionTypes.REMOVE_CHART_FROM_DASHBOARD,
  payload: { dashboardId, chartId }
});

export const removeChartFromDashboardPending = ({ dashboardId, chartId }) => ({
  type: ActionTypes.REMOVE_CHART_FROM_DASHBOARD_PENDING,
  payload: { dashboardId, chartId }
});

export const removeChartFromDashboardSuccess = ({ dashboardId, chartId, hydratedDashboard }) => ({
  type: ActionTypes.REMOVE_CHART_FROM_DASHBOARD_SUCCESS,
  payload: { dashboardId, chartId, hydratedDashboard }
});

export const removeChartFromDashboardFailed = ({ dashboardId, chartId, err }) => ({
  type: ActionTypes.REMOVE_CHART_FROM_DASHBOARD_FAILED,
  payload: { dashboardId, chartId, err }
});

