import { ActionTypes } from "./constants"

const root = state => state.browserEvents
const summaryRoot = state => root(state).summary
const summaryMeta = state => summaryRoot(state).meta
export const summaryNeverFetched = state => summaryMeta(state).status === null;
export const summaryLoading = state => summaryMeta(state).status === ActionTypes.FETCH_BROWSER_SUMMARY_PENDING;
export const summaryData = state => summaryRoot(state).data;