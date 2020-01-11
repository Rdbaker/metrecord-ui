import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from 'components/Header';
import DashboardList from 'containers/DashboardList';
import Dashboard from 'containers/Dashboard';


class Dashboards extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Route path="/dashboards" exact={true} render={() => <DashboardList />} />
        <Route path="/dashboards/:uuid" render={({ match }) => <Dashboard id={match.params.uuid} />} />
      </Fragment>
    );
  }
};


export default Dashboards;
