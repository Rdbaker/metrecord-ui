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