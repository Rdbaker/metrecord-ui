import { produce } from 'immer';
import { prop, sortBy, reverse } from 'ramda';

import { ActionTypes } from './constants';
import { ActionTypes as EndUserActionTypes} from 'modules/endUsers/constants';


const defaultState = {
  nameTypeahead: {},
  series: {},
  hasAnyEvents: null,
  allEvents: {
    byId: {},
    orderedByCreatedAt: [],
  }
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

const handleEventsFromEndUserFetch = (state, payload) => {
  const events = payload.data;
  events.forEach(event => {
    state.allEvents.byId[event.id] = event;
  });
  const allEventList = Object.values(state.allEvents.byId).filter(event => typeof event === 'object');
  const orderedEvents = reverse(sortBy(prop('created_at'), allEventList));
  state.allEvents.orderedByCreatedAt = orderedEvents;
}

const handleReceiveEvent = (state, payload) => {
  state.allEvents.byId[payload.id] = payload.data;
  const allEventList = Object.values(state.allEvents.byId).filter(event => typeof event === 'object');
  const orderedEvents = reverse(sortBy(prop('created_at'), allEventList));
  state.allEvents.orderedByCreatedAt = orderedEvents;
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
    case EndUserActionTypes.FETCH_END_USER_EVENTS_SUCCESS:
      return produce(state, draft => handleEventsFromEndUserFetch(draft, action.payload));
    case ActionTypes.RECEIVE_EVENT:
      return produce(state, draft => handleReceiveEvent(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
