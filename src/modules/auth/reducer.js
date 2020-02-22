import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  token: null,
  currentUser: null,
  verification: {},
  reportFalseEmail: {},
};


const setToken = (newState, payload) => {
  newState.token = payload.token;

  return newState;
};

const setMe = (newState, payload) => {
  newState.currentUser = payload.user;

  return newState;
};

const verifyUserPending = newState => {
  newState.verification.status = ActionTypes.VERIFY_USER_PENDING;

  return newState
};

const verifyUserSuccess = newState => {
  newState.verification.status = ActionTypes.VERIFY_USER_SUCCESS;

  return newState;
}

const verifyUserFailed = (newState, { err }) => {
  newState.verification.status = ActionTypes.VERIFY_USER_FAILED;
  newState.verification.error = err;

  return newState;
};

const reportFalseEmailPending = newState => {
  newState.reportFalseEmail.status = ActionTypes.REPORT_FALSE_EMAIL_PENDING;

  return newState
};

const reportFalseEmailSuccess = newState => {
  newState.reportFalseEmail.status = ActionTypes.REPORT_FALSE_EMAIL_SUCCESS;

  return newState;
}

const reportFalseEmailFailed = (newState, { err }) => {
  newState.reportFalseEmail.status = ActionTypes.REPORT_FALSE_EMAIL_FAILED;
  newState.reportFalseEmail.error = err;

  return newState;
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.SET_TOKEN:
      return produce(state, draftState => setToken(draftState, action.payload));
    case ActionTypes.SET_ME:
      return produce(state, draftState => setMe(draftState, action.payload));
    case ActionTypes.VERIFY_USER_PENDING:
      return produce(state, draftState => verifyUserPending(draftState));
    case ActionTypes.VERIFY_USER_SUCCESS:
      return produce(state, draftState => verifyUserSuccess(draftState));
    case ActionTypes.VERIFY_USER_FAILED:
      return produce(state, draftState => verifyUserFailed(draftState, action.payload));
    case ActionTypes.REPORT_FALSE_EMAIL_PENDING:
      return produce(state, draftState => reportFalseEmailPending(draftState));
    case ActionTypes.REPORT_FALSE_EMAIL_SUCCESS:
      return produce(state, draftState => reportFalseEmailSuccess(draftState));
    case ActionTypes.REPORT_FALSE_EMAIL_FAILED:
      return produce(state, draftState => reportFalseEmailFailed(draftState, action.payload));
    default:
      return state;
  }
}

export default reducer;