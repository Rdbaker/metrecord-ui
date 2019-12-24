import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EndUserEventPane from 'components/EndUserEventPane';
import { eventData } from 'modules/events/selectors';
import { fetchEvent } from 'modules/events/actions';

const mapStateToProps = (
  state,
  {
    match: {
      params: {
        eventId
      }
    }
  }
) => ({
  event: eventData(state, eventId)
})

const mapDispatchToProps = (dispatch) => ({
  dispatcher: {
    fetchEvent: (id) => dispatch(fetchEvent(id)),
  }
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EndUserEventPane));
