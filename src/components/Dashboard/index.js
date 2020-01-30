import React, { Component } from 'react';

import ChartDateSelect from 'components/ChartDateSelect';
import FetchableChart from 'containers/FetchableChart';


const ONE_MINUTE = 1000 * 60;
const FIFTEEN_MINUTES = ONE_MINUTE * 15; // less than this -> use 'second'
const THREE_HOURS = ONE_MINUTE * 60 * 3; // less than this -> use 'minute'
const TEN_DAYS = ONE_MINUTE * 60 * 24 * 10; // less than this -> use 'hour'


const selectInterval = (start, end) => {
  const diff = end - start;
  if (diff <= FIFTEEN_MINUTES) {
    return 'second';
  } else if (diff <= THREE_HOURS) {
    return 'minute';
  } else if (diff <= TEN_DAYS) {
    return 'hour';
  } else {
    return 'day';
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: undefined,
      endDate: undefined,
    };
  }

  componentDidMount() {
    if (this.props.neverFetched) {
      this.props.dispatcher.fetchHydratedDashboard({ dashboardId: this.props.id });
    }
  }

  handleDateChange = ({ start, end }) => this.setState({ startDate: start, endDate: end })

  renderDateSelect() {
    const {
      startDate,
      endDate,
    } = this.state;

    return (
      <ChartDateSelect onChange={this.handleDateChange} start={startDate} end={endDate} className="chart-maker--date-select"/>
    );
  }

  renderCharts() {
    const {
      chartIds=[],
      associations,
    } = this.props;

    const {
      startDate,
      endDate,
    } = this.state;

    return (<div>
      {chartIds.map(chartId => (
        <FetchableChart
          id={chartId}
          key={chartId}
          start={startDate}
          end={endDate}
          {...associations.find(assoc => assoc.chart_id === chartId).config}
          interval={selectInterval(startDate, endDate)}
        />
      ))}
    </div>);
  }

  render() {
    return (
      <div>
        {this.renderDateSelect()}
        {this.renderCharts()}
      </div>
    )
  }
}

export default Dashboard;
