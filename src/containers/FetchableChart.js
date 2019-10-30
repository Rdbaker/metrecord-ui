import React from 'react';
import { connect } from 'react-redux';
import { chartNeverFetched, chartLoading, chartFetchFailed, chartsById } from 'modules/charts/selectors';
import { fetchChart } from 'modules/charts/actions';
import { LoadingChart } from 'components/GenericChart/index';
import FetchedChart from './FetchedChart';



const mapStateToProps = (state, { id }) => ({
  chartNeverFetched: chartNeverFetched(state, id),
  chartFetchLoading: chartLoading(state, id),
  chartFetchFailed: chartFetchFailed(state, id),
  chart: chartsById(state, id),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchChart: id => dispatch(fetchChart(id))
  }
});

const FetchableChart = ({
  id,
  chartNeverFetched,
  chartFetchLoading,
  chartFetchFailed,
  chart,
  dispatcher: {
    fetchChart,
  },
  ...rest,
}) => {
  if (chartNeverFetched) {
    fetchChart(id)
    return <LoadingChart />;
  }

  if (chartFetchLoading) {
    return <LoadingChart />;
  }

  return (<FetchedChart {...rest} id={id} />);
}


export default connect(mapStateToProps, mapDispatchToProps)(FetchableChart)