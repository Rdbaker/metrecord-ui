import React from 'react';
import { Link } from 'react-router-dom';


import './style.css';


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
}) => {
  const dashboardRows = allDashboards.map(dash => dashboardToRow(dash, usersById));
  return (
    <div className="end-users-page--container">
      <h1>Your visitors</h1>
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
