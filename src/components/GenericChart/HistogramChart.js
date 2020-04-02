import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AggregateValuesToLabels } from 'modules/charts/constants';


const widths = {
  'small': 250,
  'medium': 500,
  'large': 750,
}


const createPlotOptions = (series, title, yAxisLabel, size) => ({
  plotOptions: {
    column: {
      lineWidth: 1,
      marker: {
        enabled: false,
      }
    }
  },
  xAxis: {
    title: {
      text: ''
    },
    type: 'datetime',
    minPadding: 0.05,
    maxPadding: 0.05,
    minorTickLength: 0,
    tickLength: 0,
    labels: {
      y: 25,
    },
    labels: {
      formatter: ({ value }) => new Date(value).toLocaleTimeString(window.navigator.language, {month: 'short', day: 'numeric', minute: '2-digit', hour: '2-digit'}),
    },
  },
  yAxis: {
    title: {
      text: yAxisLabel,
    },
  },
  legend: {
    enabled: true,
  },
  title: {
    text: title,
  },
  chart: {
    style: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    backgroundColor: 'transparent',
    width: widths[size],
  },
  credits: {
    enabled: false,
  },
  series,
});

const IntervalLabelToTime = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
};


const createSeriesFromRawData = (rawData, aggs, event, interpolateMissing, intervalLabel) => {
  return aggs.map(agg => createAggSeries(rawData, agg, event, interpolateMissing, intervalLabel));
};

const createAggSeries = (rawData, agg, event, interpolateMissing, intervalLabel) => {
  const dates = rawData.map(datum => new Date(datum.time).valueOf());
  let earliestDate = Math.min(...dates.map(x => Number(x)));
  const latestDate = Math.max(...dates.map(x => Number(x)));
  const gap = IntervalLabelToTime[intervalLabel]
  const fullData = [...rawData];
  while (earliestDate < latestDate) {
    if (!dates.includes(earliestDate)) {
      fullData.push({
        time: earliestDate,
        [agg]: null,
      });
    }
    earliestDate = earliestDate + gap;
  }

  return {
    name: `${AggregateValuesToLabels[agg]}`,
    type: 'column',
    marker: {
      symbol: 'circle',
    },
    data: (interpolateMissing ? rawData : fullData).map(datum => ({
      x: new Date(datum.time).valueOf(),
      y: Number(datum[agg]),
    })).sort((a, b) => a.x - b.x)
  };
}


const HistogramChart = ({
  data,
  aggs,
  event,
  yAxisLabel,
  interpolateMissing,
  interval,
  size,
}) => {
  const options = createPlotOptions(createSeriesFromRawData(data, aggs, event, interpolateMissing, interval), undefined, yAxisLabel, size);

  return (
    <div className="generic-metrics-chart--container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
};

export default HistogramChart;