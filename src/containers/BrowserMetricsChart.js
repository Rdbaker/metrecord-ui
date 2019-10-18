import { connect } from 'react-redux';

import BrowserMetricsChart from 'components/BrowserMetricsChart';
import { minuteSummaryLoading, minuteSummaryNeverFetched, minuteSummaryData } from 'modules/browserEvents/selectors';
import { fetchBrowserMinuteSummary } from 'modules/browserEvents/actions';

const mapStateToProps = state => ({
  loading: minuteSummaryLoading(state),
  neverFetched: minuteSummaryNeverFetched(state),
  data: minuteSummaryData(state),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchBrowserMinuteSummary: (start, end) => {
      const oneHour = 1000 * 60 * 60;
      const defaultEnd = new Date();
      const defaultStart = new Date(defaultEnd - oneHour);
      return dispatch(fetchBrowserMinuteSummary(start || defaultStart, end || defaultEnd));
    },
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(BrowserMetricsChart);
