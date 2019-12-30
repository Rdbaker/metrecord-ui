import { connect } from 'react-redux';

import BrowserPageLoadsChart from 'components/browserMetrics/BrowserPageLoadsChart';
import { pageLoadsLoading, pageLoadsNeverFetched, pageLoadsData } from 'modules/browserEvents/selectors';

const mapStateToProps = state => ({
  loading: pageLoadsLoading(state),
  neverFetched: pageLoadsNeverFetched(state),
  data: pageLoadsData(state),
});

export default connect(mapStateToProps)(BrowserPageLoadsChart);
