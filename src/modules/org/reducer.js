import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  org: null,
  properties: [],
  subscription: null,
};


const fetchOrgSuccess = (newState, payload) => {
  newState.org = payload.org;
  newState.properties = payload.properties;
  newState.subscription = payload.subscription;

  return newState;
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_ORG_SUCCESS:
      return produce(state, draftState => fetchOrgSuccess(draftState, action.payload));
    default:
      return state;
  }
}

export default reducer;