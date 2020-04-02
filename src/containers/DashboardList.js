import { connect } from 'react-redux';

import DashboardList from 'components/DashboardList';
import { allDashboards } from 'modules/dashboards/selectors';
import { usersById } from 'modules/user/selectors';
import { hasAnyCharts } from 'modules/charts/selectors';

const mapStateToProps = state => ({
  allDashboards: allDashboards(state),
  usersById: usersById(state),
  hasAnyCharts: hasAnyCharts(state),
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardList);
