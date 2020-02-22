import { ActionTypes } from './constants';


export const setToken = ({ token }) => ({
  type: ActionTypes.SET_TOKEN,
  payload: { token },
});

export const setMe = ({ user }) => ({
  type: ActionTypes.SET_ME,
  payload: { user },
});

export const verifyUser = ({ token }) => ({
  type: ActionTypes.VERIFY_USER,
  payload: { token },
});

export const verifyUserPending = () => ({
  type: ActionTypes.VERIFY_USER_PENDING,
  payload: {},
});

export const verifyUserFailed = ({ err }) => ({
  type: ActionTypes.VERIFY_USER_FAILED,
  payload: { err },
});

export const verifyUserSuccess = () => ({
  type: ActionTypes.VERIFY_USER_SUCCESS,
  payload: {},
});

export const reportFalseEmail = ({ userId }) => ({
  type: ActionTypes.REPORT_FALSE_EMAIL,
  payload: { userId },
});

export const reportFalseEmailPending = () => ({
  type: ActionTypes.REPORT_FALSE_EMAIL_PENDING,
  payload: {},
});

export const reportFalseEmailFailed = ({ err }) => ({
  type: ActionTypes.REPORT_FALSE_EMAIL_FAILED,
  payload: { err },
});

export const reportFalseEmailSuccess = () => ({
  type: ActionTypes.REPORT_FALSE_EMAIL_SUCCESS,
  payload: {},
});