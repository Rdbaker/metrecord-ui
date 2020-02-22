import React, { useEffect } from 'react';

import LoadingDots from 'components/LoadingDots';
import './style.css';


const FalsifyEmail = ({
  userId,
  loading,
  failed,
  success,
  neverReported,
  report,
}) => {
  useEffect(() => {
    if (neverReported) {
      report(userId);
    }
  }, [neverReported])

  return (
    <div>
      {loading && <div className="metrecord-false-email--label">Removing your email from our records<LoadingDots /></div>}
      {success && <div className="metrecord-false-email--label">Success! The user has been suspended and the abuse has been reported to our team.</div>}
      {failed && <div className="metrecord-false-email--label">It looks like your email has already been removed from our records</div>}
    </div>
  );
}

export default FalsifyEmail;