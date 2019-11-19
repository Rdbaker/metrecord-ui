import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  nameTypeahead: {},
  series: {},
  hasAnyEvents: null,
};


const fetchEventNameTypeaheadSuccess = (state, payload) => {
  state.nameTypeahead[payload.name] = {
    data: payload.data,
    status: ActionTypes.FETCH_NAME_TYPEAHEAD_SUCCESS,
    lastFetched: new Date()
  };
};

const fetchEventNameTypeaheadPending = (state, payload) => {
  state.nameTypeahead[payload.name] = {
    status: ActionTypes.FETCH_NAME_TYPEAHEAD_PENDING
  };
};

const fetchEventNameTypeaheadFailed = (state, payload) => {
  state.nameTypeahead[payload.name] = {
    status: ActionTypes.FETCH_NAME_TYPEAHEAD_FAILED,
    err: payload.err
  };
};

const fetchEventSeriesPending = (state, payload) => {
  state.series[payload.name] = {
    data: null,
    meta: {
      start: payload.start,
      end: payload.end,
      interval: payload.interval,
      lastFetched: null,
      err: null,
    },
    status: ActionTypes.FETCH_EVENT_SERIES_PENDING,
  };
};

const fetchEventSeriesSuccess = (state, payload) => {
  state.series[payload.name].data = payload.data;
  state.series[payload.name].meta.lastFetched = new Date();
  state.series[payload.name].status = ActionTypes.FETCH_EVENT_SERIES_SUCCESS;
};

const fetchEventSeriesFailed = (state, payload) => {
  state.series[payload.name].meta.err = payload.err;
  state.series[payload.name].status = ActionTypes.FETCH_EVENT_SERIES_FAILED;
};

const handleSetHasAnyEvents = (state, payload) => {
  state.hasAnyEvents = payload.hasAny;
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_NAME_TYPEAHEAD_SUCCESS:
      return produce(state, draft => fetchEventNameTypeaheadSuccess(draft, action.payload));
    case ActionTypes.FETCH_NAME_TYPEAHEAD_PENDING:
      return produce(state, draft => fetchEventNameTypeaheadPending(draft, action.payload));
    case ActionTypes.FETCH_NAME_TYPEAHEAD_FAILED:
      return produce(state, draft => fetchEventNameTypeaheadFailed(draft, action.payload));
    case ActionTypes.FETCH_EVENT_SERIES_PENDING:
      return produce(state, draft => fetchEventSeriesPending(draft, action.payload));
    case ActionTypes.FETCH_EVENT_SERIES_SUCCESS:
      return produce(state, draft => fetchEventSeriesSuccess(draft, action.payload));
    case ActionTypes.FETCH_EVENT_SERIES_FAILED:
      return produce(state, draft => fetchEventSeriesFailed(draft, action.payload));
    case ActionTypes.SET_HAS_ANY_EVENTS:
      return produce(state, draft => handleSetHasAnyEvents(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
