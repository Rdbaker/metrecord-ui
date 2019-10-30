import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import cx from 'classnames';
import * as Sentry from '@sentry/browser';

import { AuthAPI } from 'api/auth';
import { CurrentUser } from 'utils/contexts';
import { EmailLogin, EmailSignup } from 'views/login';
import Sidebar from 'components/Sidebar';
import { SHIM_URL, SNAPPER_ON_SNAPPER_CLIENT_ID, DEBUG } from 'constants/resources';
import { setMe } from 'modules/auth/actions';
import { fetchOrg } from 'modules/org/actions';

import Onboard from './views/onboard';
import Home from './views/home';
import Account from './views/account';
import NewChart from './views/newchart';
import './App.css';
import { checkStatus } from 'utils/http';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchMePending: true,
    };
  }

  componentDidMount() {
    this.mountSnapper();
    this.mountDrift();
    this.fetchMe();
  }

  fetchMe = async () => {
    AuthAPI.getMe()
      .then(checkStatus)
      .then(this.getMeSuccess)
      .catch(this.getMeFailed);
  }

  getMeSuccess = (res) => {
    const { data } = res;

    this.setState({
      currentUser: data,
      fetchMePending: false,
    });
    this.props.dispatcher.setMe({ user: data });
    this.props.dispatcher.fetchOrg();
  }

  getMeFailed = async () => {
    this.setState({
      fetchMePending: false,
    });
  }

  mountDrift = () => {
    if (!DEBUG) {
      (function() {
        var t = window.driftt = window.drift = window.driftt || [];
        if (!t.init) {
          if (t.invoked) {
            return void(window.console && console.error && console.error("Drift snippet included twice."));
          }
          t.invoked = !0;
          t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ];
          t.factory = (e) => {
            return () => {
              var n = Array.prototype.slice.call(arguments);
              return n.unshift(e), t.push(n), t;
            };
          };
          t.methods.forEach((e) => {
            t[e] = t.factory(e);
          })
          t.load = function(t) {
            var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
            o.type = "text/javascript";
            o.async = !0;
            o.crossorigin = "anonymous";
            o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(o, i);
          };
        }
      }());
      window.drift.SNIPPET_VERSION = '0.3.1';
      window.drift.load('2b7p8yk2aw3x');
    }
  }

  mountSnapper = () => {
    (function(window, document) {
      if (window.snapper) console.error('Snapper embed already included');
      window.snapper = {};
      const m = ['init', 'snap', 'debug']; window.snapper._c = [];
      m.forEach(me => window.snapper[me] = function() {window.snapper._c.push([me, arguments])});
      window.addEventListener('load', () => snapper.snap());
      var elt = document.createElement('script');
      elt.type = "text/javascript"; elt.async = true;
      elt.src = SHIM_URL;
      var before = document.getElementsByTagName('script')[0];
      before.parentNode.insertBefore(elt, before);
    })(global, document, undefined);
    global.snapper.init(SNAPPER_ON_SNAPPER_CLIENT_ID);
  }

  makeLoginRequiredComponent(AuthedComponent) {
    const {
      currentUser,
      fetchMePending,
    } = this.state;

    return () => {
      if (fetchMePending) {
        return <div>Loading...</div>;
      }

      if (!!currentUser) {
        global.drift && global.drift.on('ready', () => {
          global.drift.identify(currentUser.id, { ...currentUser });
        });

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
        <div className={cx("quicksnap-app-content--container", { 'no-sidebar': !currentUser })}>
          <CurrentUser.Provider value={currentUser}>
            <Route exact={true} path="/" render={this.makeLoginRequiredComponent(Onboard)} />
            <Route path="/home" render={this.makeLoginRequiredComponent(Home)} />
            <Route path="/login" component={EmailLogin}/>
            <Route path="/signup" component={EmailSignup}/>
            <Route path="/settings" render={this.makeLoginRequiredComponent(Account)} />
            <Route path="/new-chart" render={this.makeLoginRequiredComponent(NewChart)} />
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
    fetchOrg: () => dispatch(fetchOrg()),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
