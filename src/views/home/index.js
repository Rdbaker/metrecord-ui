import React, { Component } from 'react';

import Header from 'components/Header';
// import HomeComponent from 'containers/Home';
import BrowserMetricsChart from 'containers/BrowserMetricsChart';

import './style.css';

class Home extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <BrowserMetricsChart />
        {/* <HomeComponent /> */}
      </div>
    );
  }
}

export default Home;
