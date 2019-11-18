import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  byId: {},
  hydratedById: {},
};


const receiveDashboards = (state, payload) => {
  payload.dashboards.forEach(dashboard => {
    state.byId[dashboard.id] = {
      data: dashboard,
      meta: {
        lastFetched: new Date(),
      },
      status: ActionTypes.RECEIVE_DASHBOARDS,
    };
  });
};


const receiveDashboard = (state, payload) => {
  state.byId[payload.dashboard.id] = {
    data: payload.dashboard,
    meta: {
      lastFetched: new Date(),
    },
    status: ActionTypes.RECEIVE_DASHBOARD,
  };
};


const receiveHydratedDashboard = (state, { type: status, payload: { dashboardId, hydratedDashboard }}) => {
  state.hydratedById[dashboardId] = {
    data: hydratedDashboard,
    meta: {
      lastFetched: new Date(),
    },
    status,
  };
};

const handleHydratedDashboardPending = (state, { dashboardId }) => {
  const data = state.hydratedById[dashboardId];
  if (!data) {
    state.hydratedById[dashboardId] = {
      data: null,
      meta: {},
      status: ActionTypes.ADD_CHART_TO_DASHBOARD_PENDING,
    };
  } else {
    data.status = ActionTypes.ADD_CHART_TO_DASHBOARD_PENDING;
  }
};

const handleHydratedDashboardFailed = (state, { dashboardId, chartId, err }) => {
  state.hydratedById[dashboardId].status = ActionTypes.ADD_CHART_TO_DASHBOARD_FAILED;
  state.hydratedById[dashboardId].meta = {
    lastFetched: new Date(),
    failedOn: chartId,
    err,
  };
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_DASHBOARDS:
      return produce(state, draft => receiveDashboards(draft, action.payload));
    case ActionTypes.RECEIVE_DASHBOARD:
      return produce(state, draft => receiveDashboard(draft, action.payload));
    case ActionTypes.ADD_CHART_TO_DASHBOARD_SUCCESS:
    case ActionTypes.FETCH_HYDRATED_DASHBOARD_SUCCESS:
    case ActionTypes.REMOVE_CHART_FROM_DASHBOARD_SUCCESS:
      return produce(state, draft => receiveHydratedDashboard(draft, action));
    case ActionTypes.ADD_CHART_TO_DASHBOARD_PENDING:
      return produce(state, draft => handleHydratedDashboardPending(draft, action.payload));
    case ActionTypes.ADD_CHART_TO_DASHBOARD_FAILED:
      return produce(state, draft => handleHydratedDashboardFailed(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
