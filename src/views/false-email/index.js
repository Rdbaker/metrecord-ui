import React from 'react';
import { withRouter } from 'react-router-dom';
import FalseEmailContainer from 'containers/FalseEmail';


const FalsifyView = ({
  location: {
    search,
  }
}) => {
  const queryParams = new URLSearchParams(search);
  return <FalseEmailContainer userId={queryParams.get('user')} />
}


export const FalseEmail = withRouter(FalsifyView)