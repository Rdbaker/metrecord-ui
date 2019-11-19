import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Dashboard from 'containers/Dashboard';
import DashboardSelect from 'containers/DashboardSelect';
import comboChartSrc from 'images/combo_chart.png';

import './style.css';


const Home = ({
  hasAnyEvents,
  defaultDashboard={},
  hasAnyCharts,
  history,
}) => {
  const onChange = (option) => {
    if (option && option.value !== defaultDashboard.id) {
      history.push(`/dashboards/${option.value}`);
    }
  }

  if (!hasAnyEvents) {
    return <div>you have no events yet!</div>
  }

  if (!hasAnyCharts) {
    return (
      <div className="home-empty-dashboard--container">
        <img src={comboChartSrc} alt="empty chart" />
        <h4>You didn't make any charts yet!</h4>
        <p><Link to="new-chart">click here</Link> to make your first chart</p>
      </div>
    );
  }

  if (!defaultDashboard.id) {
    return (
      <div className="home-empty-dashboard--container">
        <img src={comboChartSrc} alt="empty chart" />
        <h4>You have no dashboards yet!</h4>
        <p><Link to="new-dashboard">Click here</Link> to start making your first dashboard</p>
      </div>
    );
  }

  return (
    <div>
      <DashboardSelect onChange={onChange} value={{ value: defaultDashboard.id, label: defaultDashboard.name }} />
      <Dashboard id={defaultDashboard.id} />
    </div>
  );
}

export default withRouter(Home);
