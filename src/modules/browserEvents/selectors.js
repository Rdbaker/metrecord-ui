import { ActionTypes } from "./constants"

const root = state => state.browserEvents

const summaryRoot = state => root(state).summary
const summaryMeta = state => summaryRoot(state).meta
export const summaryNeverFetched = state => summaryMeta(state).status === null;
export const summaryLoading = state => summaryMeta(state).status === ActionTypes.FETCH_BROWSER_SUMMARY_PENDING;
export const summaryData = state => summaryRoot(state).data;

const ajaxPointsRoot = state => root(state).ajaxPoints
export const ajaxPointsData = state => ajaxPointsRoot(state).data;

const ajaxRoot = state => root(state).ajax
const ajaxMeta = state => ajaxRoot(state).meta
export const ajaxNeverFetched = state => ajaxMeta(state).status === null;
export const ajaxLoading = state => ajaxMeta(state).status === ActionTypes.FETCH_AJAX_SUMMARY_PENDING;
export const ajaxData = state => ajaxRoot(state).data;