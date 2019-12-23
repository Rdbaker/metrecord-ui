import { ActionTypes } from './constants';

export const fetchBrowserSummary = (start, end) => ({
  type: ActionTypes.FETCH_BROWSER_SUMMARY,
  payload: { start, end }
});

export const fetchBrowserSummaryPending = () => ({
  type: ActionTypes.FETCH_BROWSER_SUMMARY_PENDING,
});

export const fetchBrowserSummaryFailed = err => ({
  type: ActionTypes.FETCH_BROWSER_SUMMARY_FAILED,
  payload: { err },
});

export const fetchBrowserSummarySuccess = data => ({
  type: ActionTypes.FETCH_BROWSER_SUMMARY_SUCCESS,
  payload: { data }
});

export const fetchAjaxSummary = (start, end) => ({
  type: ActionTypes.FETCH_AJAX_SUMMARY,
  payload: { start, end },
});

export const fetchAjaxSummaryPending = () => ({
  type: ActionTypes.FETCH_AJAX_SUMMARY_PENDING,
});

export const fetchAjaxSummaryFailed = err => ({
  type: ActionTypes.FETCH_AJAX_SUMMARY_FAILED,
  payload: { err },
});

export const fetchAjaxSummarySuccess = data => ({
  type: ActionTypes.FETCH_AJAX_SUMMARY_SUCCESS,
  payload: { data },
});

export const fetchAjaxPointsPending = () => ({
  type: ActionTypes.FETCH_AJAX_POINTS_PENDING,
});

export const fetchAjaxPointsFailed = err => ({
  type: ActionTypes.FETCH_AJAX_POINTS_FAILED,
  payload: { err },
});

export const fetchAjaxPointsSuccess = data => ({
  type: ActionTypes.FETCH_AJAX_POINTS_SUCCESS,
  payload: { data },
});
