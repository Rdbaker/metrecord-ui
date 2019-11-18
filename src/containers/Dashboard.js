import { connect } from 'react-redux';

import Dashboard from 'components/Dashboard';
import { addChartToDashboard, fetchHydratedDashboard, removeChartFromDashboard } from 'modules/dashboards/actions';
import {
  dashboard,
  hydratedDashboardNeverFetched,
  hydratedDashboardLoading,
  hydratedDashboardChartIds,
} from 'modules/dashboards/selectors';
import { allCharts } from 'modules/charts/selectors';

const mapStateToProps = (state, props) => ({
  dashboard: dashboard(state, props.id),
  charts: allCharts(state),
  neverFetched: hydratedDashboardNeverFetched(state, props.id),
  loading: hydratedDashboardLoading(state, props.id),
  chartIds: hydratedDashboardChartIds(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    addChartToDashboard: payload => dispatch(addChartToDashboard(payload)),
    fetchHydratedDashboard: payload => dispatch(fetchHydratedDashboard(payload)),
    removeChartFromDashboard: payload => dispatch(removeChartFromDashboard(payload))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
