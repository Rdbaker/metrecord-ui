import { connect } from 'react-redux';

import DashboardList from 'components/DashboardList';
import { allDashboards } from 'modules/dashboards/selectors';
import { usersById } from 'modules/user/selectors';

const mapStateToProps = state => ({
  allDashboards: allDashboards(state),
  usersById: usersById(state),
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardList);
