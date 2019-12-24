import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartDateSelect from 'components/ChartDateSelect';
import Header from 'components/Header';
// import HomeComponent from 'containers/Home';
import BrowserMetricsChart from 'containers/BrowserMetricsChart';
import BrowserAjaxChart from 'containers/BrowserAjaxChart';

import './style.css';
import { fetchAjaxSummary, fetchBrowserSummary } from 'modules/browserEvents/actions';

class Home extends Component {
  changeDates = (start, end) => {
    const {
      dispatcher: {
        fetchAjaxSummary,
        fetchBrowserSummary,
      }
    } = this.props;

    fetchAjaxSummary(start, end);
    fetchBrowserSummary(start, end);
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <ChartDateSelect onChange={({ start, end }) => this.changeDates(start, end)}/>
        <BrowserMetricsChart />
        <BrowserAjaxChart />
        {/* <HomeComponent /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchAjaxSummary: (start, end) => dispatch(fetchAjaxSummary(start, end)),
    fetchBrowserSummary: (start, end) => dispatch(fetchBrowserSummary(start, end)),
  }
})

export default connect(() => ({}), mapDispatchToProps)(Home);
