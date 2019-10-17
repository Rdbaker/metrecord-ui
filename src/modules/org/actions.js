import { ActionTypes } from './constants';


export const fetchOrg = () => ({
  type: ActionTypes.FETCH_ORG,
  payload: {},
});

export const fetchOrgPending = () => ({
  type: ActionTypes.FETCH_ORG_PENDING,
  payload: {},
});

export const fetchOrgSuccess = org => ({
  type: ActionTypes.FETCH_ORG_SUCCESS,
  payload: { org },
});

export const fetchOrgFailed = () => ({
  type: ActionTypes.FETCH_ORG_FAILED,
  payload: {},
});
