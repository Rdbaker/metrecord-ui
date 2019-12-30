import { connect } from 'react-redux';

import BrowserErrorChart from 'components/browserMetrics/BrowserErrorChart';
import { errorRateLoading, errorRateNeverFetched, errorRateHistogram } from 'modules/browserEvents/selectors';

const mapStateToProps = state => ({
  loading: errorRateLoading(state),
  neverFetched: errorRateNeverFetched(state),
  histogram: errorRateHistogram(state),
});

export default connect(mapStateToProps)(BrowserErrorChart);
