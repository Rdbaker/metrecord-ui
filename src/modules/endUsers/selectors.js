import { prop, sortBy, reverse } from 'ramda';

import { ActionTypes } from './constants';


const shouldCreateNewGroup = (lastEvt, currentEvt) => {
  const lastEvtCreatedAt = Date.parse(lastEvt.created_at);
  const currentEvtCreatedAt = Date.parse(currentEvt.created_at);

  const newDay = (new Date(lastEvtCreatedAt).getDate()) !== (new Date(currentEvtCreatedAt).getDate());

  return newDay;
}


const root = state => state.endUsers;

export const endUserPage = state => root(state).page;
export const endUserPageNeverLoaded = state => endUserPage(state) === null;

export const endUserDataRoot = state => root(state).byId;
export const endUserData = (state, id) => (endUserDataRoot(state)[id] || {}).data;
export const endUserEventFilter = state => root(state).eventFilterOption;
export const endUserGroupedEvents = (state, id) => {
  const events = endUserData(state, id) || [];
  const orderedEvents = reverse(sortBy(prop('created_at'), events));
  const filter = (endUserEventFilter(state) || {}).value;

  const shouldIncludeEvent = event => {
    if (!filter) {
      return true;
    } else {
      return event.event_type === filter;
    }
  }

  const groups = [];
  let currentGroup = [];

  orderedEvents.forEach(evt => {
    if (!shouldIncludeEvent(evt)) return

    if (currentGroup.length === 0) {
      currentGroup.push(evt);
    } else if (shouldCreateNewGroup(currentGroup[currentGroup.length - 1], evt)) {
      groups.push(currentGroup);
      currentGroup = [evt];
    } else {
      currentGroup.push(evt);
    }
  });
  groups.push(currentGroup);

  return groups;
}
export const endUserContext = (state, id) => (endUserData(state, id) || []).filter(e => e.event_type === 'user_context')[0];
export const endUserDataNeverLoaded = (state, id) => (endUserDataRoot(state)[id] || {}).status === undefined;
export const endUserDataLoading = (state, id) => (endUserDataRoot(state)[id] || {}).status === ActionTypes.FETCH_END_USER_EVENTS_PENDING;