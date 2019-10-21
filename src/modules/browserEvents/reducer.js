import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  summary: {
    data: null,
    meta: {
      lastFetched: null,
      status: null,
      error: null,
    }
  },
};


const fetchBrowserSummarySuccess = (state, payload) => {
  state.summary.data = payload.data;
  state.summary.meta.status = ActionTypes.FETCH_BROWSER_SUMMARY_SUCCESS;
  state.summary.meta.lastFetched = new Date();
};

const fetchBrowserSummaryPending = state => {
  state.status = ActionTypes.FETCH_BROWSER_SUMMARY_PENDING;
};

const fetchBrowserSummaryFailed = (state, payload) => {
  state.status = ActionTypes.FETCH_BROWSER_SUMMARY_FAILED;
  state.error = payload.err;
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_BROWSER_SUMMARY_SUCCESS:
      return produce(state, draft => fetchBrowserSummarySuccess(draft, action.payload));
    case ActionTypes.FETCH_BROWSER_SUMMARY_PENDING:
      return produce(state, draft => fetchBrowserSummaryPending(draft));
    case ActionTypes.FETCH_BROWSER_SUMMARY_FAILED:
      return produce(state, draft => fetchBrowserSummaryFailed(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;