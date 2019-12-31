import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { chart } from 'modules/charts/selectors';
import GenericChart, { LoadingChart } from 'components/GenericChart';
import { fetchEventSeries } from 'modules/events/actions';
import { seriesNeverFetched, seriesLoading, series } from 'modules/events/selectors';
import { ChartTypeToSeriesInterval } from 'modules/charts/constants';

const mapStateToProps = (state, { id }) => {
  const seriesChart = chart(state, id);
  return {
    seriesNeverFetched: seriesNeverFetched(state, seriesChart.config.event),
    seriesLoading: seriesLoading(state, seriesChart.config.event),
    series: series(state, seriesChart.config.event),
    ...seriesChart,
  }
};

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchEventSeries: (name, start, end, interval) => dispatch(fetchEventSeries(name, start, end, interval))
  }
});

class FetchedChart extends PureComponent {
  componentDidUpdate(prevProps) {
    const startChanged = this.props.start !== prevProps.start;
    const endChanged = this.props.end !== prevProps.end;
    if (this.props.seriesNeverFetched || startChanged || endChanged) {
      this.fetchData();
    }
  }

  componentDidMount() {
    if (this.props.seriesNeverFetched) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const {
      dispatcher: {
        fetchEventSeries,
      },
      start,
      end,
      config: {
        chartType,
        event,
      },
      interval,
    } = this.props;

    const now = new Date();
    const onehourago = new Date(now - (1000 * 60 * 60));
    fetchEventSeries(event, start || onehourago, end || now, interval || ChartTypeToSeriesInterval[chartType](start, end));
  }

  render() {
    const {
      seriesLoading,
      seriesNeverFetched,
      config: {
        event,
        interpolateMissing,
        yAxisLabel,
        chartType,
        agg,
        aggs,
      },
      name,
      size,
      series,
      interval,
    } = this.props;

    if (seriesNeverFetched || seriesLoading) {
      return <LoadingChart />;
    }

    return (
      <GenericChart
        type={chartType}
        event={event}
        neverFetched={seriesNeverFetched}
        data={series}
        loading={seriesLoading}
        name={name}
        size={size}
        agg={agg}
        aggs={aggs}
        yAxisLabel={yAxisLabel}
        interval={interval}
        interpolateMissing={interpolateMissing}
      />
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FetchedChart)