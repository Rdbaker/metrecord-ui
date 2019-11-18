import { EventsAPI } from 'api/events';


export const ActionTypes = {
  RECEIVE_CHART: 'RECEIVE_CHART',
  RECEIVE_CHARTS: 'RECEIVE_CHARTS',

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
  AREA: (name, start, end) => EventsAPI.fetchSeries(name, start, end, 'minute'),
  COUNT: (name, start, end) => EventsAPI.fetchSeries(name, start, end, 'year'),
};

// eventually these should take the config and the start/end dates
export const ChartTypeToSeriesInterval = {
  COUNT: () => 'year',
  AREA: () => 'hour',
  LINE: () => 'hour',
  HISTOGRAM: () => 'hour',
};

export const Aggregates = {
  Sum: 'sum',
  Average: 'avg',
  Count: 'count',
  Maximum: 'max',
  Minimum: 'min',
  '99th percentile': 'p99',
  '95th percentile': 'p95',
  '90th percentile': 'p90',
};

export const AggregateValuesToLabels = {
  sum: 'Sum',
  avg: 'Average',
  count: 'Count',
  max: 'Maximum',
  min: 'Minimum',
  p99: '99th percentile',
  p95: '95th percentile',
  p90: '90th percentile',
};

export const AggregateSelectOptions = Object.entries(Aggregates).map(([label, value]) => ({ value, label }));