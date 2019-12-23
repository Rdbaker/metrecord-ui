import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import LoadingDots from 'components/LoadingDots';
import ChartDateSelect from 'components/ChartDateSelect';
import withTimer from 'utils/timer';
import { uuidToName } from 'utils/generateName';

import './style.css';


const categoryNameToLabel = {
  p99: '99th percentile',
  p95: '95th percentile',
  p90: '90th percentile',
  p50: '50th percentile',
}

const categoryNameToColor = {
  p99: 'red',
  p95: 'orange',
  p90: 'yellow',
  p50: 'blue',
}

function tooltipFormatter() {
  const rawPoint = this.point.rawPoint;
  const method = rawPoint.data.request.options.method;
  const uri = rawPoint.data.request.uri;
  const status = rawPoint.data.response.status;
  const time = rawPoint.data.value;
  const name = uuidToName(rawPoint.end_user_id);
  const sentAt = new Date(rawPoint.created_at).toLocaleString();
  return `
    <div class="ajax-point-tooltip--container">
      <div class="ajax-point-tooltip--method">${name} sent</div>
      <div class="ajax-point-tooltip--method">${method}</div>
      <div class="ajax-point-tooltip--uri">${uri}</div>
      <div class="ajax-point-tooltip--time">at ${sentAt}</div>
      <div class="ajax-point-tooltip--response">Got a ${status} in ${time}ms</div>
    </div>
  `
}

const createPlotOptions = series => ({
  plotOptions: {
    line: {
      stacking: 'normal',
      lineColor: '#666666',
      lineWidth: 1,
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          enabled: false,
        },
        active: {
          enabled: false,
        }
      }
    }
  },
  xAxis: {
    title: {
      text: 'Time'
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
      text: 'Time (ms)',
    },
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: null,
    useHTML: true,
    shared: true,
    formatter: tooltipFormatter,
  },
  legend: {
    enabled: true,
  },
  title: {
    text: 'Ajax Latency',
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

const createSeriesFromPoints = rawPoints => {
  if (!rawPoints) return []
  const points = rawPoints.map(rawPoint => {
    let color = 'blue';
    if (rawPoint.data.response.error === 'CLIENT') {
      color = 'yellow';
    } else if (rawPoint.data.response.error === 'SERVER') {
      color = 'red';
    }
    return {
      x: new Date(rawPoint.created_at).valueOf(),
      y: rawPoint.data.value,
      color,
      rawPoint,
    };
  });

  return {
    name: 'AJAX Requests',
    type: 'scatter',
    showInLegend: false,
    marker: {
      symbol: 'circle',
      enabled: true,
      radius: 1.5
    },
    data: points.sort((a, b) => a.x - b.x)
  };
}

const createSeriesFromCategory = (categoryName, categoryData, earliestDate, latestDate) => {
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
      dateToCountMap[earliestDate + offset] = 0;
    }
    offset += interval;
  }

  return {
    name: categoryNameToLabel[categoryName],
    type: 'line',
    enableMouseTracking: false,
    marker: {
      symbol: 'circle',
    },
    color: categoryNameToColor[categoryName],
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
  return Object.entries(grouped).map(([categoryName, categoryData]) => createSeriesFromCategory(categoryName, categoryData, earliestDate, latestDate))
}

const EmptyChart = () => (
  <div className="browser-metrics-empty-chart--container">You have no data to display here!</div>
)

const LoadingChart = () => (
  <div className="browser-metrics-loading-chart--container">Loading your chart<LoadingDots /></div>
)

const BrowserAjaxChart = ({
  dispatcher: {
    fetchAjaxSummary,
  },
  neverFetched,
  loading,
  data,
  points,
}) => {
  let chart = () => <div></div>;

  if (!loading && data && data.length === 0) {
    chart = <EmptyChart />
  } else if (loading || neverFetched) {
    chart = <LoadingChart />
  } else {
    const options = createPlotOptions(createSeriesFromRawData(data));
    options.series.push(createSeriesFromPoints(points));
    chart = <HighchartsReact highcharts={Highcharts} options={options} />
  }


  return (
    <div className="browser-metrics-chart--container">
      <ChartDateSelect onChange={({ start, end }) => fetchAjaxSummary(start, end)}/>
      {chart}
    </div>
  )
}

export default withTimer('BrowserAjaxChart', BrowserAjaxChart);
