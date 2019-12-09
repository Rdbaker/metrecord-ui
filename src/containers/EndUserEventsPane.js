import { connect } from 'react-redux';

import EndUserEventsPane from 'components/EndUserEventsPane';
import { endUserGroupedEvents, endUserDataLoading } from 'modules/endUsers/selectors';
import { fetchEndUserEvents } from 'modules/endUsers/actions';

const mapStateToProps = (state, { endUserId }) => ({
  eventGroups: endUserGroupedEvents(state, endUserId),
  moreDataLoading: endUserDataLoading(state, endUserId),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEndUserEvents: (endUserId, before) => dispatch(fetchEndUserEvents(endUserId, before)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EndUserEventsPane);
