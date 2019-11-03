import { ActionTypes } from './constants';

export const receiveDashboards = dashes => ({
  type: ActionTypes.RECEIVE_DASHBOARDS,
  payload: { dashboards: dashes }
});