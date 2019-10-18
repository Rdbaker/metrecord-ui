import { ActionTypes } from "./constants"

const root = state => state.browserEvents
const minuteSummaryRoot = state => root(state).minuteSummary
const minuteSummaryMeta = state => minuteSummaryRoot(state).meta
export const minuteSummaryNeverFetched = state => minuteSummaryMeta(state).status === null;
export const minuteSummaryLoading = state => minuteSummaryMeta(state).status === ActionTypes.FETCH_BROWSER_MINUTE_SUMMARY_PENDING;
export const minuteSummaryData = state => minuteSummaryRoot(state).data;