import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './style.css';


const categoryNameToLabel = {
  dnsTime: 'DNS resolution',
  tcpTime: 'Connection time',
  ttfb: 'Time to first byte (ttfb)',
  tti: 'Time to interactive (tti)',
  domLoadCallbacks: 'DOM loaded callbacks',
  domComplete: 'DOM render complete',
  serverTime: 'Server time',
}

const createPlotOptions = series => ({
  plotOptions: {
    area: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
          lineWidth: 1,
          lineColor: '#666666'
      }
    }
  },
  xAxis: {
    title: {
      text: null
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
    text: '',
  },
  chart: {
    style: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
  },
  series,
});


const ONE_MINUTE = 1000 * 60

const createSeriesFromCategory = (categoryName, categoryData, earliestDate, latestDate) => {
  const dateToCountMap = {}

  categoryData.forEach(({ x, y }) => {
    const dateValue = new Date(x).valueOf();
    dateToCountMap[dateValue] = y
  });

  let offset = 0

  // fill in all days that have no data with 0 values
  while (earliestDate + offset <= latestDate) {
    if (!dateToCountMap.hasOwnProperty(earliestDate + offset)) {
      dateToCountMap[earliestDate + offset] = 0
    }
    offset += ONE_MINUTE;
  }

  return {
    name: categoryNameToLabel[categoryName],
    type: 'area',
    data: Object.entries(dateToCountMap).map(([date, count]) => ({
      x: Number(date),
      y: count
    })).sort((a, b) => a.x - b.x)
  };
}

const createSeriesFromRawData = rawData => {
  const grouped = {
    domComplete: [],
    domLoadCallbacks: [],
    tti: [],
    ttfb: [],
    serverTime: [],
    tcpTime: [],
    dnsTime: [],
  };
  rawData.forEach(datum => {
    Object.entries(datum).forEach(([category, time]) => {
      if (grouped[category]) {
        grouped[category].push({y: Number(time), x: new Date(datum.minute)});
      }
    });
  });

  const dates = rawData.map(datum => new Date(datum.minute));
  const earliestDate = Math.min(...dates.map(x => Number(x)));
  const latestDate = Math.max(...dates.map(x => Number(x)));
  return Object.entries(grouped).map(([categoryName, categoryData]) => createSeriesFromCategory(categoryName, categoryData, earliestDate, latestDate))
}

const EmptyChart = () => (
  <div>You have no data to display here!</div>
)

const LoadingChart = () => (
  <div>Loading your chart!</div>
)

const BrowserMetricsChart = ({
  dispatcher: {
    fetchBrowserMinuteSummary,
  },
  neverFetched,
  loading,
  data,
}) => {
  if (neverFetched) {
    fetchBrowserMinuteSummary();
  }

  if (!loading && data && data.length === 0) {
    return <EmptyChart />
  }

  if (loading || neverFetched) {
    return <LoadingChart />
  }

  const options = createPlotOptions(createSeriesFromRawData(data));

  console.log(options)
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default BrowserMetricsChart;