import { ActionTypes } from './constants';

const root = state => state.dashboards;
const byId = state => root(state).byId;
const rawDashboard = (state, id) => byId(state)[id] || {};
export const dashboard = (state, id) => rawDashboard(state, id).data;
const allRawDashboards = state => Object.values(byId(state));
export const allDashboards = state => allRawDashboards(state).map(dash => dash.data);
export const hasAnyDashboards = state => allDashboards(state).length !== 0;
export const defaultDashboard = state => {
  const allDashboards = Object.values(byId(state))
  const dashboard = allDashboards.find(({ data }) => data.meta.isDefault);
  if (!dashboard) {
    return allDashboards[0] ? allDashboards[0].data : undefined;
  } else {
    return dashboard.data;
  }
};

const hydratedDashById = state => root(state).hydratedById;
const hydratedRawDash = (state, id) => hydratedDashById(state)[id] || {};
export const hydratedDashboard = (state, id) => hydratedRawDash(state, id).data;
export const dashboardAssociations = (state, id) => (hydratedDashboard(state, id) || {}).relations;
const hydratedDashStatus = (state, id) => hydratedRawDash(state, id).status;
export const hydratedDashboardNeverFetched = (state, id) => !hydratedDashStatus(state, id);
export const hydratedDashboardLoading = (state, id) => hydratedDashStatus(state, id) === ActionTypes.FETCH_HYDRATED_DASHBOARD_PENDING;
export const hydratedDashboardChartIds = (state, id) => (hydratedDashboard(state, id) || { charts: [] }).charts.map(chart => chart.id)