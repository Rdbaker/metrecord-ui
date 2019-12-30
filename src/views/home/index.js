import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartDateSelect from 'components/ChartDateSelect';
// import Header from 'components/Header';
// import HomeComponent from 'containers/Home';
import BrowserMetricsChart from 'containers/BrowserMetricsChart';
import BrowserAjaxChart from 'containers/BrowserAjaxChart';
import BrowserPageLoadsChart from 'containers/BrowserPageLoadsChart';

import './style.css';
import { fetchAjaxSummary, fetchBrowserSummary, fetchPageLoadsSummary } from 'modules/browserEvents/actions';

class Home extends Component {
  changeDates = (start, end) => {
    const {
      dispatcher: {
        fetchAjaxSummary,
        fetchBrowserSummary,
        fetchPageLoadSummary,
      }
    } = this.props;

    fetchAjaxSummary(start, end);
    fetchBrowserSummary(start, end);
    fetchPageLoadSummary(start, end);
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <ChartDateSelect onChange={({ start, end }) => this.changeDates(start, end)}/>
        <BrowserMetricsChart />
        <BrowserAjaxChart />
        <BrowserPageLoadsChart />
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
  }
})

export default connect(() => ({}), mapDispatchToProps)(Home);
