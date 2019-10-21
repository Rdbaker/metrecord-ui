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