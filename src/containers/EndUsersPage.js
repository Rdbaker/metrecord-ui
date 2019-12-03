import { connect } from 'react-redux';

import EndUsersPage from 'components/EndUsersPage';
import { endUserPage, endUserPageNeverLoaded } from 'modules/endUsers/selectors';
import { receiveEndUserPage } from 'modules/endUsers/actions';

const mapStateToProps = state => ({
  endUserPage: endUserPage(state),
  neverLoaded: endUserPageNeverLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
  receiveEndUserPage: (page) => dispatch(receiveEndUserPage(page)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EndUsersPage);
