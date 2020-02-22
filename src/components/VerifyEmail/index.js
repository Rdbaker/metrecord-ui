import React, { useEffect } from 'react';

import LoadingDots from 'components/LoadingDots';
import './style.css';
import { useHistory } from 'react-router-dom';


const VerifyEmail = ({
  token,
  loading,
  failed,
  success,
  neverFetched,
  verify,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (neverFetched) {
      verify(token);
    }
  }, [neverFetched])

  useEffect(() => {
    if (success) {
      setTimeout(() => history.push('/home'), 500);
    }
  }, [success])

  return (
    <div>
      {loading && <div className="metrecord-verification--label">Verifying your account<LoadingDots /></div>}
      {success && <div className="metrecord-verification--label">Success!</div>}
      {failed && <div className="metrecord-verification--label">Unable to verify your account</div>}
    </div>
  );
}

export default VerifyEmail;