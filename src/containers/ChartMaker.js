import { connect } from 'react-redux';

import ChartMaker from 'components/ChartMaker';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchBrowserSummary: () => {},
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(ChartMaker);
