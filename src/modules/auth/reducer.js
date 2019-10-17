import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  token: null,
  currentUser: null,
};


const setToken = (newState, payload) => {
  newState.token = payload.token;

  return newState;
};

const setMe = (newState, payload) => {
  newState.currentUser = payload.user;

  return newState;
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.SET_TOKEN:
      return produce(state, draftState => setToken(draftState, action.payload));
    case ActionTypes.SET_ME:
      return produce(state, draftState => setMe(draftState, action.payload));
    default:
      return state;
  }
}

export default reducer;