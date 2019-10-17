import { ActionTypes } from './constants';


export const joinChannel = ({ channelName }) => ({
  type: ActionTypes.JOIN_CHANNEL,
  payload: { channelName },
});

export const joinChannelPending = ({ channelName }) => ({
  type: ActionTypes.JOIN_CHANNEL_PENDING,
  payload: { channelName },
});

export const joinChannelSuccess = ({ channelName }) => ({
  type: ActionTypes.JOIN_CHANNEL_SUCCESS,
  payload: { channelName },
});

export const joinChannelFailed = ({ channelName }) => ({
  type: ActionTypes.JOIN_CHANNEL_FAILED,
  payload: { channelName },
});

export const pushToChannel = ({ channelName, data }) => ({
  type: ActionTypes.PUSH_TO_CHANNEL,
  payload: { channelName, data },
})