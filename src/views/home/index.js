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
import Cache from 'utils/appCache';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeframe: Cache.get('timeframe'),
    };

    if (this.state.timeframe) {
      this.changeDates(new Date(this.state.timeframe.start), new Date(this.state.timeframe.end));
    }
  }

  changeDates = (start, end) => {
    Cache.set('timeframe', { start, end });
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
    const {
      timeframe = {},
    } = this.state;

    const start = timeframe.start && new Date(timeframe.start);
    const end = timeframe.end && new Date(timeframe.end);

    return (
      <div>
        {/* <Header /> */}
        <ChartDateSelect start={start} end={end} onChange={({ start, end }) => this.changeDates(start, end)}/>
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
