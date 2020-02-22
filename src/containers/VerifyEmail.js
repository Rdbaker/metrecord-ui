import { connect } from 'react-redux';

import VerifyEmailComponent from 'components/VerifyEmail';
import { verificationNeverFetched, verificationPending, verificationFailed, verificationSuccess } from 'modules/auth/selectors';
import { verifyUser } from 'modules/auth/actions';

const mapStateToProps = state => ({
  neverFetched: verificationNeverFetched(state),
  loading: verificationPending(state),
  failed: verificationFailed(state),
  success: verificationSuccess(state),
});

const mapDispatchToProps = (dispatch) => ({
  verify: (token) => dispatch(verifyUser({ token }))
});


export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailComponent);
