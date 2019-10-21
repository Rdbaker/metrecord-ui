import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  nameTypeahead: {},
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


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_NAME_TYPEAHEAD_SUCCESS:
      return produce(state, draft => fetchEventNameTypeaheadSuccess(draft, action.payload));
    case ActionTypes.FETCH_NAME_TYPEAHEAD_PENDING:
      return produce(state, draft => fetchEventNameTypeaheadPending(draft, action.payload));
    case ActionTypes.FETCH_NAME_TYPEAHEAD_FAILED:
      return produce(state, draft => fetchEventNameTypeaheadFailed(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;