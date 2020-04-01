import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import cx from 'classnames';
import * as Sentry from '@sentry/browser';

import { AuthAPI } from 'api/auth';
import { OrgsAPI } from 'api/org';
import Sidebar from 'components/Sidebar';
import { SHIM_URL, METRECORD_ON_METRECORD_CLIENT_ID } from 'constants/resources';
import { setMe } from 'modules/auth/actions';
import { fetchOrgSuccess } from 'modules/org/actions';
import { receiveOrgUsers } from 'modules/user/actions';
import { CurrentUser } from 'utils/contexts';
import { checkStatus } from 'utils/http';
import { EmailLogin, EmailSignup } from 'views/login';
import { VerifyEmail } from 'views/verify';
import { FalseEmail } from 'views/false-email';

import Onboard from './views/onboard';
import Home from './views/home';
import Account from './views/account';
import './App.css';
import { UsersAPI } from 'api/users';
import LoadingDots from 'components/LoadingDots/index';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchMePending: true,
      bootstrapDone: false,
    };
  }

  componentDidMount() {
    this.mountMetrecord();
    this.bootstrap();
  }

  bootstrap = async () => {
    await Promise.all([
      this.fetchMe(),
      this.fetchOrg(),
      this.fetchAllOrgUsers(),
    ])
    .then(([
      fetchUserResponse,
      fetchOrgResponse,
      allOrgUsersResponse,
    ]) => {
      this.getMeSuccess(fetchUserResponse);
      this.getOrgSuccess(fetchOrgResponse);
      this.getAllOrgUsersSuccess(allOrgUsersResponse);
      this.setState({
        bootstrapDone: true,
      });
    })
    .catch(errs => {
      console.warn(errs);
      this.setState({
        bootstrapDone: true,
      });
    });
  }

  fetchMe = async () => {
    return AuthAPI.getMe()
      .then(checkStatus);
  }

  fetchOrg = async () => {
    return OrgsAPI.getMyOrg()
      .then(checkStatus);
  }

  fetchAllOrgUsers = async () => {
    return UsersAPI.getAllOrgUsers();
  }

  getMeSuccess = (res) => {
    const { data } = res;
    this.setState({
      currentUser: data,
    });
    this.props.dispatcher.setMe({ user: data });
  }

  getOrgSuccess = (res) => {
    const { data } = res;
    this.props.dispatcher.setOrg(data);
  }

  getAllOrgUsersSuccess = (res) => {
    const { data } = res;
    this.props.dispatcher.setOrgUsers(data);
  }

  mountMetrecord = () => {
    (function(window, document) {
      if (window.metrecord) console.error('Metrecord embed already included');
      window.metrecord = {};
      const m = ['init', 'open', 'debug', 'submit']; window.metrecord._c = [];
      m.forEach(me => window.metrecord[me] = function() {window.metrecord._c.push([me, arguments])});
      var elt = document.createElement('script');
      elt.type = "text/javascript"; elt.async = true;
      elt.src = SHIM_URL;
      var before = document.getElementsByTagName('script')[0];
      before.parentNode.insertBefore(elt, before);
    })(global, document, undefined);
    global.metrecord.init(METRECORD_ON_METRECORD_CLIENT_ID);
  }

  makeLoginRequiredComponent(AuthedComponent) {
    const {
      currentUser,
      bootstrapDone,
    } = this.state;

    return () => {
      if (!bootstrapDone) {
        return <div className="app-bootstrap-loading--container">Loading <LoadingDots /></div>;
      }

      if (!!currentUser) {
        Sentry.configureScope((scope) => {
          scope.setUser(currentUser);
        });

        return <AuthedComponent />;
      } else {
        return <EmailLogin />;
      }
    }
  }

  render() {

    const {
      currentUser,
    } = this.state;

    return (
      <BrowserRouter>
        <Sidebar />
        <div className={cx("metrecord-app-content--container", { 'no-sidebar': !currentUser })}>
          <CurrentUser.Provider value={currentUser}>
            <Route exact={true} path="/" render={this.makeLoginRequiredComponent(Onboard)} />
            <Route path="/home" render={this.makeLoginRequiredComponent(Home)} />
            <Route path="/login" component={EmailLogin}/>
            <Route path="/verify" component={VerifyEmail}/>
            <Route path="/false-email" component={FalseEmail}/>
            <Route path="/signup" component={EmailSignup}/>
            <Route path="/settings" render={this.makeLoginRequiredComponent(Account)} />
          </CurrentUser.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    setMe: (payload) => dispatch(setMe(payload)),
    setOrg: (org) => dispatch(fetchOrgSuccess(org)),
    setOrgUsers: (users) => dispatch(receiveOrgUsers(users)),
  }
});

export default connect(() => ({}), mapDispatchToProps)(App);
