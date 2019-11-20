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
import Modal from 'components/Modal/index';

const ChartSizes = [
  { label: 'Small', value: 'small'},
  { label: 'Medium', value: 'medium'},
  { label: 'Large', value: 'large'},
  { label: 'Full width', value: 'full'},
];

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

  saveDashboard = async () => {
    const {
      titleInput,
      chartConfigs,
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

    const associations = Object.entries(chartConfigs).map(([chartId, config]) => ({ chartId, config }))

    try {
      const data = await DashboardsAPI.createDashboard({
        name: titleInput,
        config: {},
        meta: {
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      }, associations);
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

  cancel = () => {
    const {
      history,
    } = this.props;

    history.push('/');
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
          {chartIds.map(chartId => <RemovableChart key={chartId} onRemoveClick={() => this.removeChart(chartId)} id={chartId} {...chartConfigs[chartId]} start={startDate} end={endDate} interval={selectInterval(startDate, endDate)} />)}
        </div>
        <div>
          {!showChartSelect && <Button onClick={this.showChartSelect}>Add chart</Button>}
          {showChartSelect &&
            <Modal isOpen={true} onClose={this.closeAddChart} title="Add chart" className="dashboard-maker-add-chart--modal">
              <div className="dashboard-maker-add-chart-modal--content">
                <div className="dashboard-maker-add-chart--options">
                  <div className="dashboard-maker-add-chart--label">Select chart</div>
                  <Select
                    value={selectedChart}
                    onChange={this.handleChartChoiceChange}
                    options={charts.map(chart => ({ value: chart.id, label: chart.name })).filter(option => !chartIds.includes(option.value))}
                  />
                  <div className="dashboard-maker-add-chart--label">Select chart size</div>
                  <Select
                    value={selectedChartSize}
                    onChange={this.handleChartSizeChange}
                    options={ChartSizes}
                  />
                </div>
                <div className="dashboard-maker-add-chart--footer">
                  <Button onClick={this.handleAddChart}>Add to dashboard</Button>
                  <Button type="subtle" onClick={this.closeAddChart}>Cancel</Button>
                </div>
              </div>
            </Modal>
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      isEditingTitle,
      titleInput,
      saving,
    } = this.state;

    return (
      <div className={cx("generic-dashboard--container")}>
        <div>
          {!isEditingTitle && <div className="generic-dashboard--title">{titleInput} <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.setEditingTitle} icon={faPencil} size="xs" /></div></div>}
          {isEditingTitle && <div><input value={titleInput} autoFocus={true} onKeyDown={this.maybeSubmit} onChange={this.changeTitle} /> <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.submitTitle} icon={faCheck} size="xs" /></div> <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.titleCancel} icon={faTimes} size="xs" /></div></div>}
          <div>
            <Button onClick={this.showChartSelect}>Add chart</Button>
            <Button onClick={this.saveDashboard} loading={saving}>Save</Button>
            <Button onClick={this.cancel}>Cancel</Button>
          </div>
        </div>
        {this.renderDashboardContents()}
      </div>
    );
  }
}

export default withRouter(DashboardMaker);
