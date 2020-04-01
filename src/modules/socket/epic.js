import { Socket } from 'phoenix';

import { ActionTypes as OrgActionTypes } from 'modules/org/constants';
import * as SocketActions from './actions';
import { ActionTypes } from './constants';
import { WS_URL } from 'constants/resources';
import { pluck, filter, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';


const socket = new Socket(`${WS_URL}/socket`);
socket.connect();

const fetchOrgToJoinChannel = action$ => action$.pipe(
  ofType(OrgActionTypes.FETCH_ORG_SUCCESS),
  mergeMap(({ payload: { org: { client_secret } } }) => ([
    SocketActions.joinChannel({ channelName: `events:${client_secret}` }),
    SocketActions.joinChannel({ channelName: `orgs:${client_secret}` }),
  ]))
)


const joinChannel = action$ => action$.pipe(
  ofType(ActionTypes.JOIN_CHANNEL),
  pluck('payload'),
  mergeMap(({ channelName }) => {

    const pushToChannel$ = action$.pipe(
      ofType(ActionTypes.PUSH_TO_CHANNEL),
      pluck('payload'),
      filter(({ channelName: pushChannel }) => pushChannel === channelName)
    );

    // TODO: remove subscription when leaving channel
    return Observable.create(observer => {

      const channel = socket.channel(channelName, {});

      observer.next(SocketActions.joinChannelPending({ channelName }));
      channel.join()
        .receive("ok", () => observer.next(SocketActions.joinChannelSuccess({ channelName })))
        .receive("error", () => observer.next(SocketActions.joinChannelFailed({ channelName })));

      pushToChannel$.subscribe(({ data }) => channel.push(channelName, data));

      channel.onMessage = (event, payload) => {
        const [metrecord, eventName] = event.split(':');
        const isMetrecordEvent = metrecord === 'metrecord';
        if (isMetrecordEvent) {
          observer.next({
            type: ActionTypes.RECEIVE_CHANNEL_MESSAGE,
            payload: {
              data: payload,
              eventType: eventName,
            }
          })
        }
        return payload
      };
    });
  }),
)


const eventTypesToActionTypes = {
  update_gates: OrgActionTypes.RECEIVE_PROPERTIES,
}

const handleReceiveMessage = action$ => action$.pipe(
  ofType(ActionTypes.RECEIVE_CHANNEL_MESSAGE),
  pluck('payload'),
  mergeMap(({ data, eventType }) => (of({
    type: eventTypesToActionTypes[eventType] || `UNKNOWN_WS_MSG:${eventType}`,
    payload: data,
  }))),
)


export default combineEpics(
  joinChannel,
  handleReceiveMessage,
  fetchOrgToJoinChannel,
)
