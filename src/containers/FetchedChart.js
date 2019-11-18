import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { chart } from 'modules/charts/selectors';
import GenericChart, { LoadingChart } from 'components/GenericChart';
import { fetchEventSeries } from 'modules/events/actions';
import { seriesNeverFetched, seriesLoading, series } from 'modules/events/selectors';
import { ChartTypeToSeriesInterval } from 'modules/charts/constants';

const mapStateToProps = (state, { id }) => {
  const seriesChart = chart(state, id);
  const eventName = seriesChart.config.event;
  const chartType = seriesChart.config.chartType;
  const chartSize = seriesChart.config.size;
  const chartAgg = seriesChart.config.agg;
  const yAxisLabel = seriesChart.config.yAxisLabel;
  return {
    eventName,
    chartType,
    title: seriesChart.name,
    chartSize,
    seriesNeverFetched: seriesNeverFetched(state, eventName),
    seriesLoading: seriesLoading(state, eventName),
    series: series(state, eventName),
    agg: chartAgg,
    yAxisLabel,
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
      eventName,
      dispatcher: {
        fetchEventSeries,
      },
      start,
      end,
      chartType,
      interval,
    } = this.props;

    const now = new Date();
    const onehourago = new Date(now - (1000 * 60 * 60));
    fetchEventSeries(eventName, start || onehourago, end || now, interval || ChartTypeToSeriesInterval[chartType](start, end));
  }

  render() {
    const {
      seriesLoading,
      seriesNeverFetched,
      eventName,
      chartType,
      size,
      title,
      series,
      agg,
      yAxisLabel,
      interval,
    } = this.props;

    if (seriesNeverFetched || seriesLoading) {
      return <LoadingChart />;
    }

    return (
      <GenericChart
        type={chartType}
        event={eventName}
        neverFetched={seriesNeverFetched}
        data={series}
        loading={seriesLoading}
        title={title}
        size={size}
        agg={agg}
        yAxisLabel={yAxisLabel}
        interval={interval}
      />
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FetchedChart)