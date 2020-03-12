import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import RouteTabs from '../../components/RouteTabs';
import AccountSettings from './settings';
import AccountSnippet from './snippet';
import BillingSettings from './payment';
import Admin from './admin';

import './style.css';

const superAdminRoles = new Set([
  'sadmin',
  'uadmin'
]);

class AccountHome extends Component {
  currentUserIsAdmin = (currentUser) => {
    if (!currentUser) {
      return false;
    }

    return superAdminRoles.has(currentUser.role);
  }

  render() {
    var tabs = [
      { label: "Settings", route: "/settings" },
      // TODO: add these back later
      // { label: "Billing", route: "/settings/billing" },
      // { label: "Snippet", route: "/settings/snippet" }
    ];

    const currentUser = this.props.currentUser;
    if (this.currentUserIsAdmin(currentUser)) {
      tabs.push({ label: 'Admin', route: '/settings/admin' });
    }

    return (
      <div>
        <h2 className="metrecord-settings--header">Settings</h2>
        <RouteTabs tabs={tabs} />
        <div className="constrain-width">
          <div>
            <Route exact={true} path='/settings' render={() => (
              <div>
                <AccountSnippet />
              </div>
            )}/>
            <Route exact={true} path='/settings/snippet' render={() => (
              <div>
                <AccountSnippet />
              </div>
            )}/>
            <Route exact={true} path='/settings/admin' render={() => (
              <div>
                <Admin />
              </div>
            )}/>
            <Route exact={true} path='/settings/billing' render={() => (
              <div>
                <BillingSettings />
              </div>
            )}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(AccountHome);
