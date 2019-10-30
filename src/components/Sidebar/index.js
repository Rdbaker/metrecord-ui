import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faHomeAlt, faUsersCog } from '@fortawesome/pro-regular-svg-icons';
import { expireToken } from 'utils/auth';

import './style.css';

const signOut = () => {
  expireToken();
  global.location = '/';
};

const Sidebar = ({
  isLoggedIn,
}) => {
  if (!isLoggedIn) return null;

  return (
    <div className="quicksnap-sidebar--container">
      <NavLink to="/home" activeClassName="active" className="quicksnap-sidebar-link">
        <FontAwesomeIcon icon={faHomeAlt} className="quicksnap-sidebar-button--icon" />
      </NavLink>
      <NavLink to="/settings" activeClassName="active" className="quicksnap-sidebar-link quicksnap-sidebar-settings-button">
        <FontAwesomeIcon icon={faUsersCog} className="quicksnap-sidebar-button--icon" />
      </NavLink>
      <div className="quicksnap-sidebar-link quicksnap-sidebar-sign-out-button" onClick={signOut}>
        <FontAwesomeIcon icon={faSignOut} className="quicksnap-sidebar-button--icon" />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
})


export default connect(mapStateToProps)(Sidebar);
