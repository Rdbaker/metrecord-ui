import { ActionTypes } from "./constants"

const TEN_SECONDS = 1000 * 10;

const root = state => state.events;

const nameTypeaheadRoot = state => root(state).nameTypeahead;
const nameTypeaheadForName = (state, name) => nameTypeaheadRoot(state)[name] || {};
const nameTypeaheadStatus = (state, name) => nameTypeaheadForName(state, name).status;
export const nameTypeaheadLoading = (state, name) => [ActionTypes.FETCH_NAME_TYPEAHEAD_PENDING, ActionTypes.FETCH_NAME_TYPEAHEAD].includes(nameTypeaheadStatus(state, name))
export const nameTypeaheadStale = (state, name) => {
  const lastFetched = nameTypeaheadForName(state, name).lastFetched;
  if (!lastFetched) return true
  const now = new Date();
  return lastFetched.valueOf() + TEN_SECONDS < now.valueOf();
}
export const nameTypeaheadData = (state, name) => nameTypeaheadForName(state, name).data || [];

const seriesRoot = state => root(state).series
const byName = (state, name) => seriesRoot(state)[name] || {};
export const series = (state, name) => byName(state, name).data || [];
export const seriesStatus = (state, name) => byName(state, name).status;
export const seriesNeverFetched = (state, name) => [null, undefined].includes(seriesStatus(state, name));
export const seriesLoading = (state, name) => seriesStatus(state, name) === ActionTypes.FETCH_EVENT_SERIES_PENDING;
export const seriesFetchFailed = (state, name) => seriesStatus(state, name) === ActionTypes.FETCH_EVENT_SERIES_FAILED;