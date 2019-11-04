import React from 'react';
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

const FetchedChart = ({
  seriesLoading,
  seriesNeverFetched,
  eventName,
  chartType,
  chartSize,
  title,
  series,
  agg,
  yAxisLabel,
  dispatcher: {
    fetchEventSeries,
  },
}) => {
  if (seriesNeverFetched) {
    const now = new Date();
    const onehourago = new Date(now - (1000 * 60 * 60));
    fetchEventSeries(eventName, onehourago, now, ChartTypeToSeriesInterval[chartType]());
    return <LoadingChart />;
  }

  if (seriesLoading) {
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
      size={chartSize}
      agg={agg}
      yAxisLabel={yAxisLabel}
    />
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(FetchedChart)