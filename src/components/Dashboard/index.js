import React, { Component, Fragment } from 'react';
import Select from 'react-select';

import ChartDateSelect from 'components/ChartDateSelect';
import FetchableChart from 'containers/FetchableChart';


const ONE_MINUTE = 1000 * 60;
const FIFTEEN_MINUTES = ONE_MINUTE * 15; // less than this -> use 'second'
const THREE_HOURS = ONE_MINUTE * 60 * 3; // less than this -> use 'minute'
const TEN_DAYS = ONE_MINUTE * 60 * 24 * 10; // less than this -> use 'hour'


const RemovableChart = ({
  onRemoveClick,
  ...rest,
}) => (
  <div className="removable-chart--container">
    <div onClick={onRemoveClick} className="removable-chart--remove">Remove</div>
    <FetchableChart {...rest} />
  </div>
)

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
      isAddingChart: false,
      selectedChart: null,
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
  handleChartChoiceChange = option => option ? this.setState({ selectedChart: option }) : null
  addChart = () => {
    const {
      dispatcher: {
        addChartToDashboard,
      },
      id,
    } = this.props;

    const {
      selectedChart,
    } = this.state;

    addChartToDashboard({ dashboardId: id, chartId: selectedChart.value });
    this.setState({
      selectedChart: null,
      isAddingChart:false,
    });
  }

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
      dispatcher: {
        removeChartFromDashboard,
      },
      id,
    } = this.props;

    const {
      startDate,
      endDate,
    } = this.state;

    return (<div>
      {chartIds.map(chartId => (
        <RemovableChart
          onRemoveClick={() => removeChartFromDashboard({ dashboardId: id, chartId: chartId })}
          id={chartId}
          key={chartId}
          start={startDate}
          end={endDate}
          interval={selectInterval(startDate, endDate)}
        />
      ))}
    </div>);
  }

  renderAddChart() {
    const {
      charts,
      chartIds=[],
    } = this.props;

    const {
      isAddingChart,
      selectedChart,
    } = this.state;

    return <div>
      {isAddingChart && 
        <Fragment>
          <Select
            value={selectedChart}
            onChange={this.handleChartChoiceChange}
            options={charts.map(chart => ({ value: chart.id, label: chart.name })).filter(option => !chartIds.includes(option.value))}
          />
          <button onClick={this.addChart}>Add</button>
        </Fragment>
      }
      {!isAddingChart && <div onClick={() => this.setState({ isAddingChart: true })}>Add another chart</div>}
    </div>
  }

  render() {
    return (
      <div>
        {this.renderDateSelect()}
        {this.renderCharts()}
        {this.renderAddChart()}
      </div>
    )
  }
}

export default Dashboard;