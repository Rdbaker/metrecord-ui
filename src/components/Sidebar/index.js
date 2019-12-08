import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faHomeAlt, faUsersCog, faIdCard } from '@fortawesome/pro-duotone-svg-icons';
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
    <div className="metrecord-sidebar--container">
      <NavLink to="/home" activeClassName="active" className="metrecord-sidebar-link">
        <FontAwesomeIcon icon={faHomeAlt} className="metrecord-sidebar-button--icon" />
      </NavLink>
      <NavLink to="/users" activeClassName="active" className="metrecord-sidebar-link">
        <FontAwesomeIcon icon={faIdCard} className="metrecord-sidebar-button--icon" />
      </NavLink>
      <NavLink to="/settings" activeClassName="active" className="metrecord-sidebar-link metrecord-sidebar-settings-button">
        <FontAwesomeIcon icon={faUsersCog} className="metrecord-sidebar-button--icon" />
      </NavLink>
      <div className="metrecord-sidebar-link metrecord-sidebar-sign-out-button" onClick={signOut}>
        <FontAwesomeIcon icon={faSignOut} className="metrecord-sidebar-button--icon" />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
})


export default connect(mapStateToProps)(Sidebar);
