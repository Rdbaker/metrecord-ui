import { ActionTypes } from "./constants";

const root = state => state.endUsers;

export const endUserPage = state => root(state).page;
export const endUserPageNeverLoaded = state => endUserPage(state) === null;

export const endUserDataRoot = state => root(state).byId;
export const endUserData = (state, id) => (endUserDataRoot(state)[id] || {}).data;
export const endUserContext = (state, id) => (endUserData(state, id) || []).filter(e => e.event_type === 'user_context')[0];
export const endUserDataNeverLoaded = (state, id) => (endUserDataRoot(state)[id] || {}).status === undefined;
export const endUserDataLoading = (state, id) => (endUserDataRoot(state)[id] || {}).status === ActionTypes.FETCH_END_USER_EVENTS_PENDING;