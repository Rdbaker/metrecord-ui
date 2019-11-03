import { connect } from 'react-redux';

import Home from 'components/Home';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  hasAnyEvents: state.events.hasAnyEvents.has_any_events,
});

const mapDispatchToProps = () => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
