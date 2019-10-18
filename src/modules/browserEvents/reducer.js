import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  minuteSummary: {
    data: null,
    meta: {
      lastFetched: null,
      status: null,
      error: null,
    }
  },
};


const fetchBrowserMinuteSummarySuccess = (state, payload) => {
  state.minuteSummary.data = payload.data;
  state.minuteSummary.meta.status = ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_SUCCESS;
  state.minuteSummary.meta.lastFetched = new Date();
};

const fetchBrowserMinuteSummaryPending = state => {
  state.status = ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_PENDING;
};

const fetchBrowserMinuteSummaryFailed = (state, payload) => {
  state.status = ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_FAILED;
  state.error = payload.err;
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_SUCCESS:
      return produce(state, draft => fetchBrowserMinuteSummarySuccess(draft, action.payload));
    case ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_PENDING:
      return produce(state, draft => fetchBrowserMinuteSummaryPending(draft));
    case ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_FAILED:
      return produce(state, draft => fetchBrowserMinuteSummaryFailed(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;