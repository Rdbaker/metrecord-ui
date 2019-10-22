import React, { Component } from 'react';

import Header from 'components/Header';
import BrowserMetricsChart from 'containers/BrowserMetricsChart';

import './style.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserMetricsChart />
      </div>
    );
  }
}

export default Home;