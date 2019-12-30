import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartDateSelect from 'components/ChartDateSelect';
// import Header from 'components/Header';
// import HomeComponent from 'containers/Home';
import BrowserMetricsChart from 'containers/BrowserMetricsChart';
import BrowserAjaxChart from 'containers/BrowserAjaxChart';
import BrowserPageLoadsChart from 'containers/BrowserPageLoadsChart';

import './style.css';
import { fetchAjaxSummary, fetchBrowserSummary, fetchPageLoadsSummary, fetchErrorRate } from 'modules/browserEvents/actions';
import BrowserErrorChart from 'containers/BrowserErrorChart';

class Home extends Component {
  changeDates = (start, end) => {
    const {
      dispatcher: {
        fetchAjaxSummary,
        fetchBrowserSummary,
        fetchPageLoadSummary,
        fetchErrorRate,
      }
    } = this.props;

    fetchAjaxSummary(start, end);
    fetchBrowserSummary(start, end);
    fetchPageLoadSummary(start, end);
    fetchErrorRate(start, end);
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <ChartDateSelect onChange={({ start, end }) => this.changeDates(start, end)}/>
        <BrowserMetricsChart />
        <BrowserAjaxChart />
        <BrowserPageLoadsChart />
        <BrowserErrorChart />
        {/* <HomeComponent /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchAjaxSummary: (start, end) => dispatch(fetchAjaxSummary(start, end)),
    fetchBrowserSummary: (start, end) => dispatch(fetchBrowserSummary(start, end)),
    fetchPageLoadSummary: (start, end) => dispatch(fetchPageLoadsSummary(start, end)),
    fetchErrorRate: (start, end) => dispatch(fetchErrorRate(start, end))
  }
})

export default connect(() => ({}), mapDispatchToProps)(Home);
