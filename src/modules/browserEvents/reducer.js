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
  ajax: {
    data: null,
    meta: {
      lastFetched: null,
      status: null,
      error: null,
    }
  },
  ajaxPoints: {
    data: null,
    meta: {
      lastFetched: null,
      status: null,
      error: null,
    },
  },
  pageLoads: {
    data: null,
    meta: {
      lastFetched: null,
      status: null,
      error: null,
    },
  },
};


const fetchBrowserSummarySuccess = (state, payload) => {
  state.summary.data = payload.data;
  state.summary.meta.status = ActionTypes.FETCH_BROWSER_SUMMARY_SUCCESS;
  state.summary.meta.lastFetched = new Date();
};

const fetchBrowserSummaryPending = state => {
  state.summary.meta.status = ActionTypes.FETCH_BROWSER_SUMMARY_PENDING;
};

const fetchBrowserSummaryFailed = (state, payload) => {
  state.summary.meta.status = ActionTypes.FETCH_BROWSER_SUMMARY_FAILED;
  state.summary.meta.error = payload.err;
};

const fetchAjaxSummarySuccess = (state, payload) => {
  state.ajax.data = payload.data;
  state.ajax.meta.status = ActionTypes.FETCH_AJAX_SUMMARY_SUCCESS;
  state.ajax.meta.lastFetched = new Date();
};

const fetchAjaxSummaryPending = state => {
  state.ajax.meta.status = ActionTypes.FETCH_AJAX_SUMMARY_PENDING;
};

const fetchAjaxSummaryFailed = (state, payload) => {
  state.ajax.meta.status = ActionTypes.FETCH_AJAX_SUMMARY_FAILED;
  state.ajax.meta.error = payload.err;
};

const fetchAjaxPointsSuccess = (state, payload) => {
  state.ajaxPoints.data = payload.data;
  state.ajaxPoints.meta.status = ActionTypes.FETCH_AJAX_POINTS_SUCCESS;
  state.ajaxPoints.meta.lastFetched = new Date();
};

const fetchAjaxPointsPending = state => {
  state.ajaxPoints.meta.status = ActionTypes.FETCH_AJAX_POINTS_PENDING;
};

const fetchAjaxPointsFailed = (state, payload) => {
  state.ajaxPoints.meta.status = ActionTypes.FETCH_AJAX_POINTS_FAILED;
  state.ajaxPoints.meta.error = payload.err;
};

const fetchPageLoadsSuccess = (state, payload) => {
  state.pageLoads.data = payload.data;
  state.pageLoads.meta.status = ActionTypes.FETCH_AJAX_POINTS_SUCCESS;
  state.pageLoads.meta.lastFetched = new Date();
};

const fetchPageLoadsPending = state => {
  state.pageLoads.meta.status = ActionTypes.FETCH_AJAX_POINTS_PENDING;
};

const fetchPageLoadsFailed = (state, payload) => {
  state.pageLoads.meta.status = ActionTypes.FETCH_AJAX_POINTS_FAILED;
  state.pageLoads.meta.error = payload.err;
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_BROWSER_SUMMARY_SUCCESS:
      return produce(state, draft => fetchBrowserSummarySuccess(draft, action.payload));
    case ActionTypes.FETCH_BROWSER_SUMMARY_PENDING:
      return produce(state, draft => fetchBrowserSummaryPending(draft));
    case ActionTypes.FETCH_BROWSER_SUMMARY_FAILED:
      return produce(state, draft => fetchBrowserSummaryFailed(draft, action.payload));
    case ActionTypes.FETCH_AJAX_SUMMARY_SUCCESS:
      return produce(state, draft => fetchAjaxSummarySuccess(draft, action.payload));
    case ActionTypes.FETCH_AJAX_SUMMARY_PENDING:
      return produce(state, draft => fetchAjaxSummaryPending(draft));
    case ActionTypes.FETCH_AJAX_SUMMARY_FAILED:
      return produce(state, draft => fetchAjaxSummaryFailed(draft, action.payload));
    case ActionTypes.FETCH_AJAX_POINTS_FAILED:
      return produce(state, draft => fetchAjaxPointsFailed(draft, action.payload));
    case ActionTypes.FETCH_AJAX_POINTS_PENDING:
      return produce(state, draft => fetchAjaxPointsPending(draft));
    case ActionTypes.FETCH_AJAX_POINTS_SUCCESS:
      return produce(state, draft => fetchAjaxPointsSuccess(draft, action.payload));
    case ActionTypes.FETCH_PAGE_LOADS_SUMMARY_PENDING:
      return produce(state, draft => fetchPageLoadsPending(draft));
    case ActionTypes.FETCH_PAGE_LOADS_SUMMARY_SUCCESS:
      return produce(state, draft => fetchPageLoadsSuccess(draft, action.payload));
    case ActionTypes.FETCH_PAGE_LOADS_SUMMARY_FAILED:
      return produce(state, draft => fetchPageLoadsFailed(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;