import React from 'react';
import { Link } from 'react-router-dom';

import setupChartsSrc from 'images/chart-setup.svg';
import setupDashboardsSrc from 'images/dashboard-setup.svg';

import './style.css';


const NoChartsOnboarding = () => {
  return (
    <div className="dashboard-onboarding--container">
      <h3>Get started with charts!</h3>
      <div><img className="dashboard-onboarding--image" src={setupChartsSrc} alt="chart setup" /></div>
      <div>
        <p>Before you can make a dashboard you need to start with a chart</p>
        <p>You can make a chart based on any custom metric you've been tracking</p>
        <p>To track a custom metric, you can use:</p>
        <pre>metrecord.track('my_metric', 60);</pre>
        <div><Link to="/new-chart">Make a chart</Link></div>
      </div>
    </div>
  );
};

const NoDashboardsOnboarding = () => {
  return (
    <div className="dashboard-onboarding--container">
      <h3>Get started with dashboards!</h3>
      <div><img className="dashboard-onboarding--image" src={setupDashboardsSrc} alt="dashboard setup" /></div>
      <div>
        <p>Now that you've made a chart, you can make a dashboard (you can add more charts to it later)</p>
        <p>You can add multiple charts to a dashboard, in various sizes.</p>
        <div><Link to="/new-dashboard">Make a dashboard</Link></div>
      </div>
    </div>
  );
};

const formatDate = date => {
  return date.toLocaleString(window.navigator.language, { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
}

const dashboardToRow = (dashboard, usersById) => {
  const name = dashboard.name;
  const created = new Date(dashboard.created_at);
  const author = usersById[dashboard.meta.createdBy] || {};
  const authorName = author.name || author.email;
  return (
    <tr className="end-user-table--row" key={dashboard.id}>
      <td>
        <Link className="end-user-table--cell" to={`/dashboards/${dashboard.id}`}>{name}</Link>
      </td>
      <td className="end-user-table--cell">{formatDate(created)}</td>
      <td className="end-user-table--cell">{authorName}</td>
    </tr>
  );
};


const DashboardList = ({
  allDashboards,
  usersById,
  hasAnyCharts,
  hasAnyDashboards,
}) => {
  if (!hasAnyCharts) {
    return <NoChartsOnboarding />
  } else if (!hasAnyDashboards) {
    return <NoDashboardsOnboarding />
  }

  const dashboardRows = allDashboards.map(dash => dashboardToRow(dash, usersById));
  return (
    <div className="end-users-page--container">
      <h1>Your dashboards</h1>
      <table className="end-user--table">
        <thead>
          <tr>
            <th>name</th>
            <th>created on</th>
            <th>created by</th>
          </tr>
        </thead>
        <tbody>
          {dashboardRows}
        </tbody>
      </table>
    </div>
  );
}


export default DashboardList;
