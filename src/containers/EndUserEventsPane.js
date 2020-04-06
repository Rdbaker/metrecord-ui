import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EndUserEventsPane from 'components/EndUserEventsPane';
import { endUserGroupedEvents, endUserDataLoading, endUserEventFilter } from 'modules/endUsers/selectors';
import { fetchEndUserEvents, setEventFilter } from 'modules/endUsers/actions';

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
  eventFilter: endUserEventFilter(state),
  endUserId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEndUserEvents: (endUserId, before) => dispatch(fetchEndUserEvents(endUserId, before)),
  setFilter: option => dispatch(setEventFilter(option))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EndUserEventsPane));
