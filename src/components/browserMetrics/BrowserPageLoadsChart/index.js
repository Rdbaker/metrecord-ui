import React from 'react';

import LoadingDots from 'components/LoadingDots';
import withTimer from 'utils/timer';
import { withErrorBoundary } from 'utils/errorComponent';
import comboChartSrc from 'images/combo_chart.png';

import './style.css';


const EmptyChart = () => (
  <div className="browser-metrics-empty-chart--container">
    <h4>Browser Page Loads</h4>
    <img src={comboChartSrc} alt="empty chart"/>
    <div className="browser-metrics-empty-chart--text">You have no data for this time</div>
  </div>
)

const LoadingChart = () => (
  <div className="browser-metrics-loading-chart--container">
    <h4>Browser Page Loads</h4>
    <div className="browser-metrics-loading-chart--text">Loading your chart<LoadingDots /></div>
  </div>
)


const BrowserPageLoadsChart = ({
  neverFetched,
  loading,
  data,
}) => {
  let chart = () => <div></div>;

  if (!loading && (!data)) {
    chart = <EmptyChart />
  } else if (loading || neverFetched) {
    chart = <LoadingChart />
  } else {
    chart = (
      <div className="browser-count-chart--container">
        <h4>Browser Page Loads</h4>
        <div className="browser-count-chart--value-container">
          <div className="browser-count-chart--value">
            {data.total}
          </div>
          <div className="browser-count-chart--helptext">
            from {data.unique} unique user{data.unique !== 1 ? 's': ''}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="browser-metrics-chart--container">
      {chart}
    </div>
  )
}

export default withTimer('BrowserPageLoadsChart', withErrorBoundary(BrowserPageLoadsChart));
