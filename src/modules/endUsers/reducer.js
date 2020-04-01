
import { produce } from 'immer';

import { ActionTypes } from './constants';

const defaultState = {
  page: null,
  byId: {},
};


const handleReceivePage = (state, { page }) => {
  state.page = page;
};


const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case ActionTypes.RECEIVE_END_USERS_PAGE:
      return produce(state, draft => handleReceivePage(draft, action.payload));
    default:
      return state;
  }
}

export default reducer;
