import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { withRouter } from 'react-router-dom';

import LoadingDots from 'components/LoadingDots';
import withTimer from 'utils/timer';
import { withErrorBoundary } from 'utils/errorComponent';
import comboChartSrc from 'images/combo_chart.png';


const createPlotOptions = series => ({
  plotOptions: {
    line: {
      lineWidth: 1,
      marker: {
        enabled: false,
      },
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
      text: 'Errors',
    },
  },
  legend: {
    enabled: true,
  },
  title: {
    text: 'Error Rate',
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

const createSeries = (data, earliestDate, latestDate) => {
  const dateToCountMap = {}

  data.forEach(({ x, y }) => {
    const dateValue = new Date(x).valueOf();
    dateToCountMap[dateValue] = y
  });

  let offset = 0
  const interval = latestDate - earliestDate >= ONE_THOUSAND_MINUTE ? ONE_HOUR : ONE_MINUTE;

  // fill in all days that have no data with 0 values
  while (earliestDate + offset <= latestDate) {
    if (!dateToCountMap.hasOwnProperty(earliestDate + offset)) {
      dateToCountMap[earliestDate + offset] = 0;
    }
    offset += interval;
  }

  return {
    name: 'Error rate',
    type: 'line',
    // enableMouseTracking: false,
    marker: {
      symbol: 'circle',
    },
    color: 'red',
    data: Object.entries(dateToCountMap).map(([date, time]) => ({
      x: Number(date),
      y: time !== null ? Math.round(time) : null,
    })).sort((a, b) => a.x - b.x)
  };
}

const createSeriesFromRawData = rawData => {
  const grouped = {
    p99: [],
    p95: [],
    p90: [],
    p50: [],
  };
  rawData.forEach(datum => {
    Object.entries(datum).forEach(([category, time]) => {
      if (grouped[category]) {
        grouped[category].push({y: Number(time), x: new Date(datum.time)});
      }
    });
  });

  const dates = rawData.map(datum => new Date(datum.time));
  const earliestDate = Math.min(...dates.map(x => Number(x)));
  const latestDate = Math.max(...dates.map(x => Number(x)));
  const formattedData = rawData.map(datum => ({ y: datum.count, x: new Date(datum.time) }));
  const series = [createSeries(formattedData, earliestDate, latestDate)];
  return series
}

const EmptyChart = () => (
  <div className="browser-metrics-empty-chart--container">
    <h4>Browser Error Rate</h4>
    <img src={comboChartSrc} alt="empty chart"/>
    <div className="browser-metrics-empty-chart--text">You have no errors for this time frame!</div>
  </div>
)

const LoadingChart = () => (
  <div className="browser-metrics-loading-chart--container">
    <h4>Browser Error Rate</h4>
    <div className="browser-metrics-loading-chart--text">Loading your chart<LoadingDots /></div>
  </div>
)

const BrowserErrorChart = ({
  neverFetched,
  loading,
  histogram,
}) => {
  let chart = () => <div></div>;

  if (!loading && histogram && histogram.length === 0) {
    chart = <EmptyChart />
  } else if (loading || neverFetched) {
    chart = <LoadingChart />
  } else {
    const options = createPlotOptions(createSeriesFromRawData(histogram));
    chart = <HighchartsReact highcharts={Highcharts} options={options} />
  }


  return (
    <div className="browser-metrics-chart--container">
      {chart}
    </div>
  )
}

export default withTimer('BrowserErrorChart', withErrorBoundary(withRouter(BrowserErrorChart)));
