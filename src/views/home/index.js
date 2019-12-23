import React, { Component } from 'react';

import Header from 'components/Header';
// import HomeComponent from 'containers/Home';
import BrowserMetricsChart from 'containers/BrowserMetricsChart';
import BrowserAjaxChart from 'containers/BrowserAjaxChart';

import './style.css';

class Home extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <BrowserMetricsChart />
        <BrowserAjaxChart />
        {/* <HomeComponent /> */}
      </div>
    );
  }
}

export default Home;
