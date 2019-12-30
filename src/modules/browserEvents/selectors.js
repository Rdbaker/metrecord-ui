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

const pageLoadsRoot = state => root(state).pageLoads
const pageLoadsMeta = state => pageLoadsRoot(state).meta
export const pageLoadsNeverFetched = state => pageLoadsMeta(state).status === null;
export const pageLoadsLoading = state => pageLoadsMeta(state).status === ActionTypes.FETCH_PAGE_LOADS_SUMMARY_PENDING;
export const pageLoadsData = state => pageLoadsRoot(state).data;

const errorRateRoot = state => root(state).errorRate
const errorRateMeta = state => errorRateRoot(state).meta
export const errorRateNeverFetched = state => errorRateMeta(state).status === null;
export const errorRateLoading = state => errorRateMeta(state).status === ActionTypes.FETCH_BROWSER_ERROR_RATE_PENDING;
export const errorRateData = state => errorRateRoot(state).data || {};
export const errorRateHistogram = state => errorRateData(state).histogram;