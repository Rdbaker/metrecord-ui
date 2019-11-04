import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AggregateValuesToLabels } from 'modules/charts/constants';


const createPlotOptions = (series, title, yAxisLabel) => ({
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        enabled: false,
      }
    }
  },
  xAxis: {
    title: {
      text: 'Time'
    },
    type: 'datetime',
    dateTimeLabelFormats: {
      day: '%b %d',
    },
    minPadding: 0.05,
    maxPadding: 0.05,
    minorTickLength: 0,
    tickLength: 0,
    labels: {
      y: 25,
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
  },
  credits: {
    enabled: false,
  },
  series,
});


const createSeriesFromRawData = (rawData, agg, event, interpolateMissing) => {
  const dates = rawData.map(datum => new Date(datum.time).valueOf());
  let earliestDate = Math.min(...dates.map(x => Number(x)));
  const latestDate = Math.max(...dates.map(x => Number(x)));
  const gap = 1000 * 60;
  const fullData = [...rawData];
  while (earliestDate < latestDate) {
    if (!dates.includes(earliestDate)) {
      fullData.push({
        time: earliestDate,
        [agg]: null,
      });
    }
    earliestDate = new Date(+earliestDate + gap);
  }

  return [{
    name: `${event} - ${AggregateValuesToLabels[agg]}`,
    type: 'area',
    marker: {
      symbol: 'circle',
    },
    data: (interpolateMissing ? rawData : fullData).map(datum => ({
      x: new Date(datum.time).valueOf(),
      y: Number(datum[agg]),
    })).sort((a, b) => a.x - b.x)
  }];
}


const AreaChart = ({
  data,
  agg,
  event,
  yAxisLabel,
  interpolateMissing,
}) => {
  const options = createPlotOptions(createSeriesFromRawData(data, agg, event, interpolateMissing), undefined, yAxisLabel);

  return (
    <div className="browser-metrics-chart--container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
};

export default AreaChart;