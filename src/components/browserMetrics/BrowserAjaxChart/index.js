import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { withRouter } from 'react-router-dom';

import LoadingDots from 'components/LoadingDots';
import withTimer from 'utils/timer';
import { uuidToName } from 'utils/generateName';
import comboChartSrc from 'images/combo_chart.png';

import './style.css';


const categoryNameToLabel = {
  p99: '99th percentile',
  p95: '95th percentile',
  p90: '90th percentile',
  p50: '50th percentile',
}

const categoryNameToColor = {
  p99: 'var(--color-pink-6)',
  p95: 'var(--color-orange-4)',
  p90: 'var(--color-yellow-4)',
  p50: 'var(--color-green-4)',
}

function tooltipFormatter() {
  try {
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
  } catch (e) {
    console.warn(e);
    return '';
  }
}

const makeClickPoint = (pushHistory) => {

  const click = (endUserId, eventId) => {
    pushHistory(`/users/${endUserId}/events/${eventId}`);
  }

  return function clickPoint(event) {
    const rawPoint = event.point.rawPoint;
    click(rawPoint.end_user_id, rawPoint.id);
  }
}

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

const createSeriesFromPoints = (rawPoints, pushHistory) => {
  if (!rawPoints) return []
  const points = rawPoints.map(rawPoint => {
    let color = 'blue';
    if (rawPoint.data.response.error === 'CLIENT') {
      color = 'orange';
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
    events: {
      click: makeClickPoint(pushHistory),
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
  const series = Object.entries(grouped).map(([categoryName, categoryData]) => createSeriesFromCategory(categoryName, categoryData, earliestDate, latestDate))
  return series
}

const EmptyChart = () => (
  <div className="browser-metrics-empty-chart--container">
    <h4>Ajax Latency</h4>
    <img src={comboChartSrc} alt="empty chart"/>
    <div className="browser-metrics-empty-chart--text">You have no data for this time</div>
  </div>
)

const LoadingChart = () => (
  <div className="browser-metrics-loading-chart--container">
    <h4>Browser Load Speed</h4>
    <div className="browser-metrics-loading-chart--text">Loading your chart<LoadingDots /></div>
  </div>
)

const BrowserAjaxChart = ({
  neverFetched,
  loading,
  data,
  points,
  history,
}) => {
  let chart = () => <div></div>;

  if (!loading && data && data.length === 0) {
    chart = <EmptyChart />
  } else if (loading || neverFetched) {
    chart = <LoadingChart />
  } else {
    const options = createPlotOptions(createSeriesFromRawData(data));
    options.series.push(createSeriesFromPoints(points, history.push));
    chart = <HighchartsReact highcharts={Highcharts} options={options} />
  }


  return (
    <div className="browser-metrics-chart--container">
      {chart}
    </div>
  )
}

export default withTimer('BrowserAjaxChart', withRouter(BrowserAjaxChart));
