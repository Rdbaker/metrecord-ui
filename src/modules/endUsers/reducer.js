
import { produce } from 'immer';

import { ActionTypes } from './constants';

const defaultState = {
  page: null,
  byId: {},
  eventFilterOption: null,
};


const handleReceivePage = (state, { page }) => {
  state.page = page;
};

const handleSetFilter = (state, { option }) => {
  state.eventFilterOption = option;
};

const fetchEndUserPending = (state, { endUserId }) => {
  const isEmpty = !state.byId[endUserId];
  state.byId[endUserId] = {
    status: ActionTypes.FETCH_END_USER_EVENTS_PENDING,
    data: isEmpty ? [] : state.byId[endUserId].data,
  };
};

const fetchEndUserSuccess = (state, { data, before, endUserId }) => {
  state.byId[endUserId].status = ActionTypes.FETCH_END_USER_EVENTS_SUCCESS;
  state.byId[endUserId].lastLimit = before;
  state.byId[endUserId].data = state.byId[endUserId].data.concat(data);
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_END_USERS_PAGE:
      return produce(state, draft => handleReceivePage(draft, action.payload));
    case ActionTypes.FETCH_END_USER_EVENTS_PENDING:
      return produce(state, draft => fetchEndUserPending(draft, action.payload));
    case ActionTypes.FETCH_END_USER_EVENTS_SUCCESS:
      return produce(state, draft => fetchEndUserSuccess(draft, action.payload));
    case ActionTypes.HANDLE_SET_FILTER:
      return produce(state, draft => handleSetFilter(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
