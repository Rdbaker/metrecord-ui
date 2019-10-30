import { EventsAPI } from 'api/events';


export const ActionTypes = {
  RECEIVE_CHART: 'RECEIVE_CHART',

  FETCH_CHART: 'FETCH_CHART',
  FETCH_CHART_PENDING: 'FETCH_CHART_PENDING',
  FETCH_CHART_SUCCESS: 'FETCH_CHART_SUCCESS',
  FETCH_CHART_FAILED: 'FETCH_CHART_FAILED',
};

export const ChartTypes = {
  HISTOGRAM: 'HISTOGRAM',
  LINE: 'LINE',
  AREA: 'AREA',
  COUNT: 'COUNT',
};

export const ChartTypeToAPICall = {
  HISTOGRAM: () => ([]),
  LINE: () => ([]),
  AREA: () => ([]),
  COUNT: (name, start, end) => EventsAPI.fetchSeries(name, start, end, 'year'),
};

// eventually these should take the config and the start/end dates
export const ChartTypeToSeriesInterval = {
  COUNT: () => 'year',
  AREA: () => 'hour',
  LINE: () => 'hour',
  HISTOGRAM: () => 'hour',
};