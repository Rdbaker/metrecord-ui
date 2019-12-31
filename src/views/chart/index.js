import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import FetchableChart from 'containers/FetchableChart';
import ChartDateSelect from 'components/ChartDateSelect/index';
import { connect } from 'react-redux';
import { chart } from 'modules/charts/selectors';

import './style.css';


class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      end: null,
    };
  }

  handleDateChange = ({ start, end }) => this.setState({ start: start, end: end })

  render() {
    const {
      match: {
        params: {
          uuid: chartId
        }
      },
      chart,
    } = this.props;

    const {
      start,
      end
    } = this.state;

    return (
      <div>
        <div className="chart-header--breadcrumbs">
          <Link to="/charts">charts</Link>
          <div>&gt;</div>
          <div>{chart.name}</div>
        </div>
        <ChartDateSelect onChange={this.handleDateChange} start={start} end={end} className="chart-maker--date-select"/>
        <FetchableChart id={chartId} size="large" start={start} end={end} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  chart: chart(state, props.match.params.uuid)
});

const ChartView = withRouter(connect(mapStateToProps)(View));

export default ChartView;