import { ActionTypes } from './constants';

export const fetchNameTypeahead = (name) => ({
  type: ActionTypes.FETCH_NAME_TYPEAHEAD,
  payload: { name },
});

export const fetchNameTypeaheadPending = (name) => ({
  type: ActionTypes.FETCH_NAME_TYPEAHEAD_PENDING,
  payload: { name },
});

export const fetchNameTypeaheadFailed = (name, err) => ({
  type: ActionTypes.FETCH_NAME_TYPEAHEAD_FAILED,
  payload: { name, err },
});

export const fetchNameTypeaheadSuccess = (name, data) => ({
  type: ActionTypes.FETCH_NAME_TYPEAHEAD_SUCCESS,
  payload: { name, data }
});

export const fetchEventSeries = (name, start, end, interval) => ({
  type: ActionTypes.FETCH_EVENT_SERIES,
  payload: { name, start, end, interval },
});

export const fetchEventSeriesPending = (name, start, end, interval) => ({
  type: ActionTypes.FETCH_EVENT_SERIES_PENDING,
  payload: { name, start, end, interval },
});

export const fetchEventSeriesFailed = (name, err, start, end) => ({
  type: ActionTypes.FETCH_EVENT_SERIES_FAILED,
  payload: { name, err, start, end },
});

export const fetchEventSeriesSuccess = (name, data, start, end) => ({
  type: ActionTypes.FETCH_EVENT_SERIES_SUCCESS,
  payload: { name, data, start, end }
});