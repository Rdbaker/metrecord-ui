import { connect } from 'react-redux';

import DashboardMaker from 'components/DashboardMaker';
import { receiveDashboard } from 'modules/dashboards/actions';
import { allCharts } from 'modules/charts/selectors';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  charts: allCharts(state),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    receiveDashboard: (dashboard) => dispatch(receiveDashboard(dashboard)),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardMaker);
