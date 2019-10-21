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