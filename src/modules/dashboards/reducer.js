import { produce } from 'immer';

import { ActionTypes } from './constants';


const defaultState = {
  byId: {},
};


const receiveDashboards = (state, payload) => {
  payload.dashboards.forEach(dashboard => {
    state.byId[dashboard.id] = {
      data: dashboard,
      meta: {
        lastFetched: new Date(),
      },
      status: ActionTypes.RECEIVE_DASHBOARDS,
    };
  });
};

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_DASHBOARDS:
      return produce(state, draft => receiveDashboards(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
