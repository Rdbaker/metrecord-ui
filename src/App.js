import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import cx from 'classnames';
import * as Sentry from '@sentry/browser';

import { AuthAPI } from 'api/auth';
import { ChartsAPI } from 'api/charts';
import { DashboardsAPI } from 'api/dashboards';
import { EventsAPI } from 'api/events';
import { OrgsAPI } from 'api/org';
import Sidebar from 'components/Sidebar';
import { SHIM_URL, METRECORD_ON_METRECORD_CLIENT_ID } from 'constants/resources';
import { setMe } from 'modules/auth/actions';
import { receiveCharts } from 'modules/charts/actions';
import { receiveDashboards } from 'modules/dashboards/actions';
import { setHasAnyEvents } from 'modules/events/actions';
import { fetchOrgSuccess } from 'modules/org/actions';
import { receiveOrgUsers } from 'modules/user/actions';
import { CurrentUser } from 'utils/contexts';
import { checkStatus } from 'utils/http';
import { EmailLogin, EmailSignup } from 'views/login';
import { VerifyEmail } from 'views/verify';
import { FalseEmail } from 'views/false-email';
import { UsersView } from 'views/users';
import { SingleUserView } from 'views/user';

import Onboard from './views/onboard';
import Home from './views/home';
import Account from './views/account';
import NewChart from './views/newchart';
import NewDashboard from './views/newdashboard';
import Charts from './views/charts';
import Chart from './views/chart';
import DashboardsView from './views/dashboards';
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
    const bootstrapStart = global.performance.now();
    await Promise.all([
      this.fetchMe(),
      this.fetchOrg(),
      this.fetchHasAnyEvents(),
      this.fetchAllDashboards(),
      this.fetchAllCharts(),
      this.fetchAllOrgUsers(),
    ])
    .then(([
      fetchUserResponse,
      fetchOrgResponse,
      hasAnyEventsResponse,
      dashboardsResponse,
      chartsResponse,
      allOrgUsersResponse,
    ]) => {
      this.getMeSuccess(fetchUserResponse);
      this.getOrgSuccess(fetchOrgResponse);
      this.getHasAnyEventsSuccess(hasAnyEventsResponse);
      this.getAllDashboardsSuccess(dashboardsResponse);
      this.getAllChartsSuccess(chartsResponse);
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
    const bootstrapEnd = global.performance.now();
    global.metrecord.track('bootstrap.time_ms', bootstrapEnd - bootstrapStart);

  }

  fetchMe = async () => {
    return AuthAPI.getMe()
      .then(checkStatus);
  }

  fetchOrg = async () => {
    return OrgsAPI.getMyOrg()
      .then(checkStatus);
  }

  fetchHasAnyEvents = async () => {
    return EventsAPI.hasAny();
  }

  fetchAllDashboards = async () => {
    return DashboardsAPI.paginateDashboards();
  }

  fetchAllCharts = async () => {
    return ChartsAPI.paginateCharts();
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

  getHasAnyEventsSuccess = (res) => {
    this.props.dispatcher.setHasAnyEvents(res);
  }

  getAllDashboardsSuccess = (res) => {
    const { page } = res;
    this.props.dispatcher.setDashboards(page);
  }

  getAllChartsSuccess = (res) => {
    const { page } = res;
    this.props.dispatcher.setCharts(page);
  }

  getAllOrgUsersSuccess = (res) => {
    const { data } = res;
    this.props.dispatcher.setOrgUsers(data);
  }

  mountMetrecord = () => {
    (function(window, document) {
      if (window.metrecord) console.error('Metrecord embed already included');
      window.metrecord = {};
      const m = ['init', 'snap', 'debug', 'track']; window.metrecord._c = [];
      m.forEach(me => window.metrecord[me] = function() {window.metrecord._c.push([me, arguments])});
      window.addEventListener('load', () => metrecord.snap());
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
            <Route path="/charts" exact={true} render={this.makeLoginRequiredComponent(Charts)} />
            <Route path="/charts/:uuid" render={this.makeLoginRequiredComponent(Chart)} />
            <Route path="/new-chart" render={this.makeLoginRequiredComponent(NewChart)} />
            <Route path="/new-dashboard" render={this.makeLoginRequiredComponent(NewDashboard)} />
            <Route path="/users/:uuid" render={this.makeLoginRequiredComponent(SingleUserView)} />
            <Route path="/dashboards" render={this.makeLoginRequiredComponent(DashboardsView)} />
            <Route exact={true} path="/users" render={this.makeLoginRequiredComponent(UsersView)} />
          </CurrentUser.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    setMe: (payload) => dispatch(setMe(payload)),
    setOrg: (org) => dispatch(fetchOrgSuccess(org)),
    setHasAnyEvents: (hasAny) => dispatch(setHasAnyEvents(hasAny)),
    setDashboards: (dashboards) => dispatch(receiveDashboards(dashboards)),
    setCharts: (charts) => dispatch(receiveCharts(charts)),
    setOrgUsers: (users) => dispatch(receiveOrgUsers(users)),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
