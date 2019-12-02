import produce from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  byId: {},
};

const receiveOrgUsers = (newState, { users }) => {
  users.forEach(user => {
    newState.byId[user.id] = user;
  });
  return newState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_ORG_USERS:
      return produce(state, draftState => receiveOrgUsers(draftState, action.payload));
    case ActionTypes.BULK_GET_END_USERS_SUCESS:
      return produce(state, draftState => receiveBulkUsers(draftState, action.payload));
    default:
      return state;
  }
};