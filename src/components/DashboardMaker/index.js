import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import Select from 'react-select';

import { DashboardsAPI } from 'api/dashboards';
import FetchableChart from 'containers/FetchableChart';
import Button from 'components/shared/Button/index';
import ChartDateSelect from 'components/ChartDateSelect/index';

import './style.css';

const ChartSizes = [
  { label: 'Small', value: 'small'},
  { label: 'Medium', value: 'medium'},
  { label: 'Large', value: 'large'},
  { label: 'Full width', value: 'full'},
];

const RemovableChart = ({
  onRemoveClick,
  ...rest,
}) => (
  <div className="removable-chart--container">
    <div onClick={onRemoveClick} className="removable-chart--remove">Remove</div>
    <FetchableChart {...rest} />
  </div>
)


class DashboardMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditingTitle: false,
      showChartSelect: false,
      titleInput: 'New Dashboard',
      saving: false,
      saved: false,
      saveError: null,
      chartIds: [],
      chartConfigs: {},
      selectedChart: null,
      selectedChartSize: ChartSizes[1],
      startDate: undefined,
      endDate: undefined,
    };
  }

  saveChart = async () => {
    const {
      dashboardTitle,
    } = this.state;

    const {
      currentUser,
      dispatcher: {
        receiveDashboard,
      },
      history,
    } = this.props;

    this.setState({
      saving: true,
    });

    try {
      const data = await DashboardsAPI.createDashboard({
        name: dashboardTitle,
        config: {
        },
        meta: {
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      });
      this.setState({
        saving: false,
        saved: true,
      });
      receiveDashboard(data);
      history.push('/');
    } catch (e) {
      this.setState({
        saving: false,
        saveError: e,
      })
    }
  }


  maybeSubmit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.preventDefault();
      this.setState({ isEditingTitle: false });
    }
  }

  changeTitle = (e) => this.setState({ titleInput: e.target.value })
  submitTitle = () => this.setState({ isEditingTitle: false })
  titleCancel = () => this.setState({ isEditingTitle: false })
  setEditingTitle = () => this.setState({ isEditingTitle: true })
  showChartSelect = () => this.setState({ showChartSelect: true })
  handleChartChoiceChange = option => this.setState({ selectedChart: option })
  handleChartSizeChange = option => this.setState({ selectedChartSize: option })
  handleDateChange = ({ start, end }) => this.setState({ startDate: start, endDate: end })

  handleAddChart = () => {
    const {
      selectedChart,
      chartConfigs,
      chartIds,
      selectedChartSize,
    } = this.state;

    if (selectedChart) {
      this.setState({
        chartIds: [...chartIds, selectedChart.value],
        chartConfigs: {
          [selectedChart.value]: {
            size: selectedChartSize.value,
          },
          ...chartConfigs,
        }
      });
    }

    this.closeAddChart();
  }

  closeAddChart = () => {
    this.setState({
      showChartSelect: false,
      selectedChart: null,
    });
  }

  removeChart = (id) => {
    const {
      chartIds,
      chartConfigs,
    } = this.state;

    const newChartConfigs = Object.assign({}, chartConfigs);
    delete newChartConfigs[id]

    this.setState({
      chartIds: chartIds.filter(chartId => chartId !== id),
      chartConfigs: newChartConfigs,
    });
  }

  renderDashboardContents() {
    const {
      chartIds,
      showChartSelect,
      selectedChart,
      selectedChartSize,
      chartConfigs,
      startDate,
      endDate,
    } = this.state;

    const {
      charts,
    } = this.props;

    return (
      <div>
        <ChartDateSelect onChange={this.handleDateChange} start={startDate} end={endDate} className="chart-maker--date-select"/>
        <div className="dashboard-maker-charts--container">
          {chartIds.map(chartId => <RemovableChart key={chartId} onRemoveClick={() => this.removeChart(chartId)} id={chartId} size={chartConfigs[chartId].size} start={startDate} end={endDate} />)}
        </div>
        <div>
          {!showChartSelect && <Button onClick={this.showChartSelect}>Add chart</Button>}
          {showChartSelect &&
            <div>
              <Select
                value={selectedChart}
                onChange={this.handleChartChoiceChange}
                options={charts.map(chart => ({ value: chart.id, label: chart.name })).filter(option => !chartIds.includes(option.value))}
              />
              <Select
                value={selectedChartSize}
                onChange={this.handleChartSizeChange}
                options={ChartSizes}
              />
              {selectedChart && <FetchableChart id={selectedChart.value} size={selectedChartSize.value} start={startDate} end={endDate} />}
              <Button onClick={this.handleAddChart}>Add to dashboard</Button>
              <Button onClick={this.closeAddChart}>Cancel</Button>
            </div>
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      isEditingTitle,
      titleInput,
    } = this.state;

    return (
      <div className={cx("generic-dashboard--container")}>
        {!isEditingTitle && <div className="generic-dashboard--title">{titleInput} <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.setEditingTitle} icon={faPencil} size="xs" /></div></div>}
        {isEditingTitle && <div><input value={titleInput} autoFocus={true} onKeyDown={this.maybeSubmit} onChange={this.changeTitle} /> <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.submitTitle} icon={faCheck} size="xs" /></div> <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.titleCancel} icon={faTimes} size="xs" /></div></div>}
        {this.renderDashboardContents()}
      </div>
    );
  }
}

export default withRouter(DashboardMaker);
