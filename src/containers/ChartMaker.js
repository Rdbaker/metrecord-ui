import { connect } from 'react-redux';

import ChartMaker from 'components/ChartMaker';
import { receiveChart } from 'modules/charts/actions';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    receiveChart: (chart) => dispatch(receiveChart(chart)),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(ChartMaker);
