import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import LoadingDots from 'components/LoadingDots';
import ChartDateSelect from 'components/ChartDateSelect';

import './style.css';


const createPlotOptions = series => ({
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
      text: 'Time (ms)',
    },
  },
  legend: {
    enabled: true,
  },
  title: {
    text: 'Browser Load Speed',
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


const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_THOUSAND_MINUTE = ONE_MINUTE * 1000;

const createSeriesFromCategory = (categoryData, earliestDate, latestDate) => {
  const dateToCountMap = {}

  categoryData.forEach(({ x, y }) => {
    const dateValue = new Date(x).valueOf();
    dateToCountMap[dateValue] = y
  });

  let offset = 0
  const interval = latestDate - earliestDate >= ONE_THOUSAND_MINUTE ? ONE_HOUR : ONE_MINUTE;

  // fill in all days that have no data with 0 values
  while (earliestDate + offset <= latestDate) {
    if (!dateToCountMap.hasOwnProperty(earliestDate + offset)) {
      dateToCountMap[earliestDate + offset] = null
    }
    offset += interval;
  }

  return {
    type: 'area',
    marker: {
      symbol: 'circle',
    },
    data: Object.entries(dateToCountMap).map(([date, number]) => ({
      x: Number(date),
      y: number !== null ? Math.round(number) : null,
    })).sort((a, b) => a.x - b.x)
  };
}

const createSeriesFromRawData = rawData => {
  const data = rawData.map(datum => ({y: Number(datum.value), x: new Date(datum.minute)}));

  const dates = rawData.map(datum => new Date(datum.minute));
  const earliestDate = Math.min(...dates.map(x => Number(x)));
  const latestDate = Math.max(...dates.map(x => Number(x)));
  return createSeriesFromCategory(data, earliestDate, latestDate);
}

const EmptyChart = () => (
  <div className="browser-metrics-empty-chart--container">You have no data to display here!</div>
)

const LoadingChart = () => (
  <div className="browser-metrics-loading-chart--container">Loading your chart<LoadingDots /></div>
)

const GenericChart = ({
  dispatcher: {
    fetchChartData,
  },
  chartId,
  neverFetched,
  loading,
  data,
  config,
}) => {
  if (neverFetched) {
    fetchChartData(chartId);
  }
  let chart = () => <div></div>;

  if (!loading && data && data.length === 0) {
    chart = <EmptyChart />
  } else if (loading || neverFetched) {
    chart = <LoadingChart />
  } else {
    const options = createPlotOptions(createSeriesFromRawData(data));
    chart = <HighchartsReact highcharts={Highcharts} options={options} />
  }


  return (
    <div className="browser-metrics-chart--container">
      <ChartDateSelect onChange={({ start, end }) => fetchChartData(start, end)}/>
      {chart}
    </div>
  )
}

export default GenericChart;
