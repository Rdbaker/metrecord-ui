import { ActionTypes } from './constants';


export const setToken = ({ token }) => ({
  type: ActionTypes.SET_TOKEN,
  payload: { token },
});

export const setMe = ({ user }) => ({
  type: ActionTypes.SET_ME,
  payload: { user },
});
