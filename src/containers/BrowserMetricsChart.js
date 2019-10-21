import { connect } from 'react-redux';

import BrowserMetricsChart from 'components/BrowserMetricsChart';
import { summaryLoading, summaryNeverFetched, summaryData } from 'modules/browserEvents/selectors';
import { fetchBrowserSummary } from 'modules/browserEvents/actions';

const mapStateToProps = state => ({
  loading: summaryLoading(state),
  neverFetched: summaryNeverFetched(state),
  data: summaryData(state),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchBrowserSummary: (start, end) => {
      const oneHour = 1000 * 60 * 60;
      const defaultEnd = new Date();
      const defaultStart = new Date(defaultEnd - oneHour);
      return dispatch(fetchBrowserSummary(start || defaultStart, end || defaultEnd));
    },
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(BrowserMetricsChart);
