import { connect } from 'react-redux';

import DashboardMaker from 'components/DashboardMaker';
import { fetchHydratedDashboardSuccess } from 'modules/dashboards/actions';
import { allCharts } from 'modules/charts/selectors';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  charts: allCharts(state),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    receiveDashboard: (payload) => dispatch(fetchHydratedDashboardSuccess({ dashboardId: payload.dashboard.id, hydratedDashboard: payload })),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardMaker);
