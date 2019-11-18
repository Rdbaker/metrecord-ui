import { ActionTypes } from "./constants";


export const receiveChart = chart => ({
  type: ActionTypes.RECEIVE_CHART,
  payload: { chart }
});

export const receiveCharts = charts => ({
  type: ActionTypes.RECEIVE_CHARTS,
  payload: { charts }
});

export const fetchChart = id => ({
  type: ActionTypes.FETCH_CHART,
  payload: { id },
});

export const fetchChartPending = id => ({
  type: ActionTypes.FETCH_CHART_PENDING,
  payload: { id },
});

export const fetchChartSuccess = (id, data) => ({
  type: ActionTypes.FETCH_CHART_SUCCESS,
  payload: { id, data },
});

export const fetchChartFailed = (id, err) => ({
  type: ActionTypes.FETCH_CHART_FAILED,
  payload: { id, err },
});