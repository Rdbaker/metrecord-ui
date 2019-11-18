import React from 'react';
import { withRouter } from 'react-router-dom';

import Dashboard from 'containers/Dashboard';
import DashboardSelect from 'containers/DashboardSelect';

const Home = ({
  hasAnyEvents,
  defaultDashboard={},
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

  return (
    <div>
      <DashboardSelect onChange={onChange} value={{ value: defaultDashboard.id, label: defaultDashboard.name }} />
      <Dashboard id={defaultDashboard.id} />
    </div>
  );
}

export default withRouter(Home);