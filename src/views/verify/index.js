import React from 'react';
import { withRouter } from 'react-router-dom';
import VerifyEmailContainer from 'containers/VerifyEmail';


const VerifyView = ({
  location: {
    search,
  }
}) => {
  const queryParams = new URLSearchParams(search);
  return <VerifyEmailContainer token={queryParams.get('t')} />
}


export const VerifyEmail = withRouter(VerifyView)