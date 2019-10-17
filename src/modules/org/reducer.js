import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  data: null,
};


const fetchOrgSuccess = (newState, payload) => {
  newState.data = payload.org;

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