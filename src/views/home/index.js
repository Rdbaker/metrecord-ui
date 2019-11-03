import React, { Component } from 'react';

import Header from 'components/Header';
import HomeComponent from 'containers/Home';
// import BrowserMetricsChart from 'containers/BrowserMetricsChart';
// import FetchableChart from 'containers/FetchableChart';

import './style.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <BrowserMetricsChart /> */}
        <HomeComponent />
        {/* <FetchableChart id={'c3c67949-1145-4ba6-bbd5-bba1f0f948de'} /> */}
      </div>
    );
  }
}

export default Home;
