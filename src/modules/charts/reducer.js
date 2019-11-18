import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  byId: {},
};


const receiveChart = (state, payload) => {
  state.byId[payload.chart.id] = {
    data: payload.chart,
    meta: {
      lastFetched: new Date(),
    },
    status: ActionTypes.RECEIVE_CHART,
  };
};

const receiveCharts = (state, payload) => {
  payload.charts.forEach(chart => {
    state.byId[chart.id] = {
      data: chart,
      meta: {
        lastFetched: new Date(),
      },
      status: ActionTypes.RECEIVE_CHARTS,
    };
  })
};

const fetchChartPending = (state, payload) => {
  state.byId[payload.id] = {
    data: null,
    meta: null,
    status: ActionTypes.FETCH_CHART_PENDING,
  };
};

const fetchChartSuccess = (state, payload) => {
  state.byId[payload.id] = {
    data: payload.data,
    meta: {
      lastFetched: new Date(),
    },
    status: ActionTypes.FETCH_CHART_SUCCESS,
  }
};

const fetchChartFailed = (state, payload) => {
  state.byId[payload.id] = {
    data: null,
    meta: {
      err: payload.err,
    },
    status: ActionTypes.FETCH_CHART_FAILED,
  }
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_CHART:
      return produce(state, draft => receiveChart(draft, action.payload));
    case ActionTypes.RECEIVE_CHARTS:
      return produce(state, draft => receiveCharts(draft, action.payload));
    case ActionTypes.FETCH_CHART_PENDING:
      return produce(state, draft => fetchChartPending(draft, action.payload));
    case ActionTypes.FETCH_CHART_SUCCESS:
      return produce(state, draft => fetchChartSuccess(draft, action.payload));
    case ActionTypes.FETCH_CHART_FAILED:
      return produce(state, draft => fetchChartFailed(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
