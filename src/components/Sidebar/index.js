import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faHomeAlt, faUsersCog, faIdCard, faAnalytics } from '@fortawesome/pro-duotone-svg-icons';
import { hasCustomMetrics } from 'modules/org/selectors';
import { expireToken } from 'utils/auth';

import './style.css';

const signOut = () => {
  expireToken();
  global.location = '/';
};

const Sidebar = ({
  isLoggedIn,
  hasCustomMetrics,
}) => {
  if (!isLoggedIn) return null;

  return (
    <Fragment>
      <div className="metrecord-sidebar--container">
        <NavLink to="/home" activeClassName="active" data-tip="home" className="metrecord-sidebar-link">
          <FontAwesomeIcon icon={faHomeAlt} className="metrecord-sidebar-button--icon" />
        </NavLink>
        {hasCustomMetrics &&
          <NavLink to="/metrics" activeClassName="active" data-tip="metrics" className="metrecord-sidebar-link">
            <FontAwesomeIcon icon={faAnalytics} className="metrecord-sidebar-button--icon" />
          </NavLink>
        }
        <NavLink to="/users" activeClassName="active" data-tip="users" className="metrecord-sidebar-link">
          <FontAwesomeIcon icon={faIdCard} className="metrecord-sidebar-button--icon" />
        </NavLink>
        <NavLink to="/settings" activeClassName="active" data-tip="settings" className="metrecord-sidebar-link metrecord-sidebar-settings-button">
          <FontAwesomeIcon icon={faUsersCog} className="metrecord-sidebar-button--icon" />
        </NavLink>
        <div className="metrecord-sidebar-link metrecord-sidebar-sign-out-button" data-tip="logout" onClick={signOut}>
          <FontAwesomeIcon icon={faSignOut} className="metrecord-sidebar-button--icon" />
        </div>
      </div>
      <ReactTooltip effect="solid" place="right" backgroundColor="var(--color-blue-6)" textColor="var(--color-green-1)"/>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.currentUser,
  hasCustomMetrics: hasCustomMetrics(state),
})


export default connect(mapStateToProps)(Sidebar);
