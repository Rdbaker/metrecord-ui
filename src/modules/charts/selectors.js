import { ActionTypes } from "./constants";

const chartsRoot = state => state.charts;
const byIdRoot = state => chartsRoot(state).byId;
const byId = (state, id) => byIdRoot(state)[id] || {};
export const chartsById = byIdRoot;
export const chart = (state, id) => byId(state, id).data;
export const chartStatus = (state, id) => byId(state, id).status;
export const charts = state => Object.values(byIdRoot(state)).map(d => d.data);
export const hasAnyCharts = state => charts(state).length !== 0;
export const chartNeverFetched = (state, id) => [null, undefined].includes(chartStatus(state, id));
export const chartLoading = (state, id) => chartStatus(state, id) === ActionTypes.FETCH_CHART_PENDING;
export const chartFetchFailed = (state, id) => chartStatus(state, id) === ActionTypes.FETCH_CHART_FAILED;
export const allCharts = state => Object.values(byIdRoot(state)).map(chartState => chartState.data);