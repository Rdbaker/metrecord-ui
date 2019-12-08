import { connect } from 'react-redux';

import EndUserContextPane from 'components/EndUserContextPane';
import { endUserContext } from 'modules/endUsers/selectors';

const mapStateToProps = (state, { endUserId }) => ({
  contextEvent: endUserContext(state, endUserId),
});

export default connect(mapStateToProps)(EndUserContextPane);
