import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  org: null,
  properties: [],
  subscription: null,
};


const propertyIsEqual = (prop1, prop2) => {
  return prop1.name === prop2.name && prop1.type === prop2.type;
}


const fetchOrgSuccess = (newState, payload) => {
  newState.org = payload.org;
  newState.properties = payload.properties;
  newState.subscription = payload.subscription;

  return newState;
};

const receiveProperties = (newState, { data }) => {
  newState.properties = newState.properties.map(prop => {
    const newProp = data.filter((p2) => propertyIsEqual(prop, p2))[0];
    if (newProp) {
      return newProp;
    } else {
      return prop;
    }
  });
  return newState;
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_ORG_SUCCESS:
      return produce(state, draftState => fetchOrgSuccess(draftState, action.payload));
    case ActionTypes.RECEIVE_PROPERTIES:
      return produce(state, draftState => receiveProperties(draftState, action.payload));
    default:
      return state;
  }
}

export default reducer;