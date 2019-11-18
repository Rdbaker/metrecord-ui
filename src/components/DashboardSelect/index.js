import React from 'react';
import Select from 'react-select';

import './style.css';

const DashboardSelect = ({
  label='Pick a dashboard',
  allDashboards,
  ...selectProps,
}) => (
  <div className="dashboard-select--container">
    {label && <label className="dashboard-select-label">{label}</label>}
    <Select options={allDashboards.map(dash => ({ label: dash.name, value: dash.id }))} {...selectProps} />
  </div>
);

export default DashboardSelect;
