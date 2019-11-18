import { connect } from 'react-redux';

import Home from 'components/Home';
import { defaultDashboard } from 'modules/dashboards/selectors';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  hasAnyEvents: state.events.hasAnyEvents.has_any_events,
  defaultDashboard: defaultDashboard(state),
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
