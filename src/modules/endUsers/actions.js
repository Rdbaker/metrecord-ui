import { ActionTypes } from "./constants";

export const receiveEndUserPage = (page) => ({
  type: ActionTypes.RECEIVE_END_USERS_PAGE,
  payload: { page },
});

export const fetchEndUserEvents = (endUserId, before) => ({
  type: ActionTypes.FETCH_END_USER_EVENTS,
  payload: { before, endUserId },
});

export const fetchEndUserEventsPending = (endUserId, before) => ({
  type: ActionTypes.FETCH_END_USER_EVENTS_PENDING,
  payload: { before, endUserId },
});

export const fetchEndUserEventsSuccess = (endUserId, before, data) => ({
  type: ActionTypes.FETCH_END_USER_EVENTS_SUCCESS,
  payload: { before, endUserId, data },
});

export const fetchEndUserEventsFailed = (endUserId, before, err) => ({
  type: ActionTypes.FETCH_END_USER_EVENTS_FAILED,
  payload: { before, endUserId, err },
});

export const setEventFilter = (option) => ({
  type: ActionTypes.HANDLE_SET_FILTER,
  payload: { option },
});
