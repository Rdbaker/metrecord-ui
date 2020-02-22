import { connect } from 'react-redux';

import FalseEmailComponent from 'components/FalseEmail';
import { reportFalseEmailNeverFetched, reportFalseEmailPending, reportFalseEmailFailed, reportFalseEmailSuccess } from 'modules/auth/selectors';
import { reportFalseEmail } from 'modules/auth/actions';

const mapStateToProps = state => ({
  neverReported: reportFalseEmailNeverFetched(state),
  loading: reportFalseEmailPending(state),
  failed: reportFalseEmailFailed(state),
  success: reportFalseEmailSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  report: (userId) => dispatch(reportFalseEmail({ userId }))
});


export default connect(mapStateToProps, mapDispatchToProps)(FalseEmailComponent);
