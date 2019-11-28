import { ActionTypes } from './constants';


export const bulkGetEndUsersSuccess = data => ({
  type: ActionTypes.BULK_GET_END_USERS_SUCESS,
  payload: data,
});

export const bulkGetEndUsersFailed = err => ({
  type: ActionTypes.BULK_GET_END_USERS_FAILED,
  payload: { err },
});

export const receiveOrgUsers = users => ({
  type: ActionTypes.RECEIVE_ORG_USERS,
  payload: { users },
});