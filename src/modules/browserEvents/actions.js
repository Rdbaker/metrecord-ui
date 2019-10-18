import { ActionTypes } from './constants';

export const fetchBrowserMinuteSummary = (start, end) => ({
  type: ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY,
  payload: { start, end }
});

export const fetchBrowserMinuteSummaryPending = () => ({
  type: ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_PENDING,
});

export const fetchBrowserMinuteSummaryFailed = err => ({
  type: ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_FAILED,
  payload: { err },
});

export const fetchBrowserMinuteSummarySuccess = data => ({
  type: ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_SUCCESS,
  payload: { data }
})