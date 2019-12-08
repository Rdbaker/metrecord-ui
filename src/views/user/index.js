import React from 'react';
import { withRouter } from 'react-router-dom';
import EndUserPage from 'containers/EndUserPage';


export const UserView = ({
  match: {
    params: {
      uuid
    }
  }
}) => <EndUserPage endUserId={uuid} />


export const SingleUserView = withRouter(UserView)