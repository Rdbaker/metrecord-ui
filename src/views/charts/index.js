import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { charts } from 'modules/charts/selectors';


const chartToRow = chart => {
  return (
    <tr className="end-user-table--row" key={chart.id}>
      <td>
        <Link className="end-user-table--cell" to={`/charts/${chart.id}`}>{chart.name}</Link>
      </td>
      <td className="end-user-table--cell">{chart.config.event}</td>
      <td className="end-user-table--cell">{chart.config.chartType.toLowerCase()}</td>
    </tr>
  );
};


const ChartsView = ({
  charts
}) => {
  const chartRows = charts.map(chartToRow)

  return (
    <div className="end-users-page--container">
      <h1>Your charts</h1>
      <table className="end-user--table">
        <thead>
          <tr>
            <th>name</th>
            <th>event</th>
            <th>chart type</th>
          </tr>
        </thead>
        <tbody>
          {chartRows}
        </tbody>
      </table>
    </div>
  );
}


const mapStateToProps = state => ({
  charts: charts(state)
})


export default connect(mapStateToProps)(ChartsView);