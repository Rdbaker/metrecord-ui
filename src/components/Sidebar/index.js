import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faMicrophoneAlt, faUsersCog } from '@fortawesome/pro-regular-svg-icons';
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
    <div className="agora-sidebar--container">
      <NavLink to="/chat" activeClassName="active" className="agora-sidebar-link">
        <FontAwesomeIcon icon={faMicrophoneAlt} className="agora-sidebar-button--icon" />
      </NavLink>
      <NavLink to="/settings" activeClassName="active" className="agora-sidebar-link agora-sidebar-settings-button">
        <FontAwesomeIcon icon={faUsersCog} className="agora-sidebar-button--icon" />
      </NavLink>
      <div className="agora-sidebar-link agora-sidebar-sign-out-button" onClick={signOut}>
        <FontAwesomeIcon icon={faSignOut} className="agora-sidebar-button--icon" />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
})


export default connect(mapStateToProps)(Sidebar);