import { ActionTypes } from "./constants";

export const receiveEndUserPage = (page) => ({
  type: ActionTypes.RECEIVE_END_USERS_PAGE,
  payload: { page },
});