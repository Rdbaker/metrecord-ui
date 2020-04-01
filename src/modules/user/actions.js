import { ActionTypes } from './constants';


export const receiveOrgUsers = users => ({
  type: ActionTypes.RECEIVE_ORG_USERS,
  payload: { users },
});