import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EndUserEventsPane from 'components/EndUserEventsPane';
import { endUserGroupedEvents, endUserDataLoading } from 'modules/endUsers/selectors';
import { fetchEndUserEvents } from 'modules/endUsers/actions';

const mapStateToProps = (
  state,
  {
    match: {
      params: {
        uuid: endUserId
      }
    }
  }
) => ({
  eventGroups: endUserGroupedEvents(state, endUserId),
  moreDataLoading: endUserDataLoading(state, endUserId),
  endUserId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEndUserEvents: (endUserId, before) => dispatch(fetchEndUserEvents(endUserId, before)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EndUserEventsPane));
