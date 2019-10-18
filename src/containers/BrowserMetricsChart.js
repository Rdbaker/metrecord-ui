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
    fetchBrowserMinuteSummary: () => {
      const oneHour = 1000 * 60 * 60;
      const end = new Date();
      const start = new Date(end - oneHour);
      return dispatch(fetchBrowserMinuteSummary(start, end));
    },
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(BrowserMetricsChart);