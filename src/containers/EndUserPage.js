import { connect } from 'react-redux';

import EndUserPage from 'components/EndUserPage';
import { endUserData, endUserDataNeverLoaded, endUserDataLoading } from 'modules/endUsers/selectors';
import { fetchEndUserEvents } from 'modules/endUsers/actions';

const mapStateToProps = (state, { endUserId }) => ({
  endUserData: endUserData(state, endUserId),
  neverLoaded: endUserDataNeverLoaded(state, endUserId),
  loading: endUserDataLoading(state, endUserId),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEndUserEvents: (endUserId, before) => dispatch(fetchEndUserEvents(endUserId, before)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EndUserPage);
