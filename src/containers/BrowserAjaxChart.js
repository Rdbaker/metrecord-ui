import { connect } from 'react-redux';

import BrowserAjaxChart from 'components/browserMetrics/BrowserAjaxChart';
import { ajaxLoading, ajaxNeverFetched, ajaxData, ajaxPointsData } from 'modules/browserEvents/selectors';
import { fetchAjaxSummary } from 'modules/browserEvents/actions';

const mapStateToProps = state => ({
  loading: ajaxLoading(state),
  neverFetched: ajaxNeverFetched(state),
  data: ajaxData(state),
  points: ajaxPointsData(state),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchAjaxSummary: (start, end) => {
      const oneHour = 1000 * 60 * 60;
      const defaultEnd = new Date();
      const defaultStart = new Date(defaultEnd - oneHour);
      return dispatch(fetchAjaxSummary(start || defaultStart, end || defaultEnd));
    },
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(BrowserAjaxChart);
