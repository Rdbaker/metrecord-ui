import { connect } from 'react-redux';

import DashboardSelect from 'components/DashboardSelect';
import { allDashboards } from 'modules/dashboards/selectors';

const mapStateToProps = state => ({
  allDashboards: allDashboards(state),
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardSelect);
