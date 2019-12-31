import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartLine, faChartArea, faTally } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';

import { ChartsAPI } from 'api/charts';
import ChartDateSelect from 'components/ChartDateSelect';
import GenericChart from 'components/GenericChart';
import EventNameTypeahead from 'containers/EventNameTypeahead';
import Button from 'components/shared/Button';
import { ChartTypeToAPICall, ChartTypes, AggregateSelectOptions } from 'modules/charts/constants';

import './style.css';


class ChartMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvent: null,
      selectedChartType: null,
      chartDataNeverFetched: true,
      chartDataLoading: false,
      chartData: [],
      chartDataFetchError: null,
      chartTitle: 'New Chart',
      yAxisLabel: 'Value',
      rollup: AggregateSelectOptions[0],
      rollups: [AggregateSelectOptions[0].value],
      interpolateMissing: false,
      saving: false,
      saved: false,
      saveError: null,
    };
  }

  handleRollupChange = option => {
    if (option) {
      this.setState({ rollup: option });
    }
  };

  toggleRollup = rollup => {
    const {
      rollups,
    } = this.state;

    if (rollups.includes(rollup)) {
      this.setState({
        rollups: rollups.filter(r => r !== rollup)
      });
    } else {
      this.setState({
        rollups: rollups.concat([rollup])
      });
    }
  }

  fetchChartData = async (start, end) => {
    const {
      selectedChartType,
      selectedEvent,
    } = this.state;

    this.setState({
      chartDataLoading: true,
      chartDataNeverFetched: false,
    });

    const fetchEnd = end || new Date();
    const fetchStart = start || new Date(+fetchEnd - 1000 * 60 * 60 * 3);
    try {
      const { data } = await ChartTypeToAPICall[selectedChartType](selectedEvent, fetchStart, fetchEnd);
      this.setState({
        chartData: data,
        chartDataLoading: false,
      });
    } catch (e) {
      this.setState({
        chartDataFetchError: e,
        chartDataLoading: false,
      });
    }
  }

  saveChart = async () => {
    const {
      selectedEvent,
      selectedChartType,
      chartTitle,
      rollup,
      rollups,
      yAxisLabel,
      interpolateMissing,
    } = this.state;

    const {
      currentUser,
      dispatcher: {
        receiveChart,
      },
      history,
    } = this.props;

    this.setState({
      saving: true,
    });

    try {
      const data = await ChartsAPI.createChart({
        name: chartTitle,
        config: {
          event: selectedEvent,
          chartType: selectedChartType,
          agg: rollup.value,
          aggs: rollups,
          yAxisLabel: yAxisLabel,
          interpolateMissing,
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
      receiveChart(data);
      history.push('/');
    } catch (e) {
      this.setState({
        saving: false,
        saveError: e,
      })
    }
  }

  changeTitle = (title) => {
    this.setState({ chartTitle: title });
  }

  renderChartOptionsMaker() {
    const {
      selectedChartType,
    } = this.state;

    return (
      <div>
        <label className="chart-type-container-label">Pick chart type</label>
        <div className="chart-maker-type-choice--container">
          <div
            className={cx("chart-maker-chart-type--container", { selected: selectedChartType === ChartTypes.HISTOGRAM })}
            onClick={() => this.setState({ selectedChartType: ChartTypes.HISTOGRAM })}
          >
            <FontAwesomeIcon icon={faChartBar} size="3x" />
            <div className="chart-maker-chart-type--label">histogram</div>
          </div>
          <div
            className={cx("chart-maker-chart-type--container", { selected: selectedChartType === ChartTypes.LINE })}
            onClick={() => this.setState({ selectedChartType: ChartTypes.LINE })}
          >
            <FontAwesomeIcon icon={faChartLine} size="3x"/>
            <div className="chart-maker-chart-type--label">line chart</div>
          </div>
          <div
            className={cx("chart-maker-chart-type--container", { selected: selectedChartType === ChartTypes.AREA })}
            onClick={() => this.setState({ selectedChartType: ChartTypes.AREA })}
          >
            <FontAwesomeIcon icon={faChartArea} size="3x"/>
            <div className="chart-maker-chart-type--label">area chart</div>
          </div>
          <div
            className={cx("chart-maker-chart-type--container", { selected: selectedChartType === ChartTypes.COUNT })}
            onClick={() => this.setState({ selectedChartType: ChartTypes.COUNT })}
          >
            <FontAwesomeIcon icon={faTally} size="3x"/>
            <div className="chart-maker-chart-type--label">count</div>
          </div>
        </div>
      </div>
    )
  }

  renderChart() {
    const {
      selectedChartType,
      selectedEvent,
      chartData,
      chartDataLoading,
      chartDataNeverFetched,
      chartTitle,
      rollup,
      rollups,
      yAxisLabel,
      interpolateMissing,
    } = this.state;

    if (!selectedChartType || !selectedEvent) {
      return null;
    }

    return (
      <div>
        <label className="chart-type-container-label">Pick chart dates</label>
        <ChartDateSelect onChange={({ start, end }) => this.fetchChartData(start, end)} />
        <div className="chart-maker-generic--container">
          <GenericChart
            type={selectedChartType}
            event={selectedEvent}
            fetchChartData={this.fetchChartData}
            neverFetched={chartDataNeverFetched}
            data={chartData}
            loading={chartDataLoading}
            name={chartTitle}
            onTitleChange={this.changeTitle}
            size="large"
            agg={rollup.value}
            aggs={rollups}
            yAxisLabel={yAxisLabel}
            interpolateMissing={interpolateMissing}
          />
        </div>
      </div>
    )
  }

  renderMultiAggOptions() {
    const {
      rollups,
    } = this.state;

    return (
      <div className="multi-agg-options--container">
        <div className="multi-agg--container">
          <div>
            <input type="checkbox" id="count-agg" checked={rollups.includes('count')} onChange={() => this.toggleRollup('count')} />
            <label htmlFor="count-agg">Count</label>
          </div>
          <div>
            <input type="checkbox" id="sum-agg" checked={rollups.includes('sum')} onChange={() => this.toggleRollup('sum')} />
            <label htmlFor="sum-agg">Sum</label>
          </div>
          <div>
            <input type="checkbox" id="avg-agg" checked={rollups.includes('avg')} onChange={() => this.toggleRollup('avg')} />
            <label htmlFor="avg-agg">Average</label>
          </div>
          <div>
            <input type="checkbox" id="min-agg" checked={rollups.includes('min')} onChange={() => this.toggleRollup('min')} />
            <label htmlFor="min-agg">Minimum</label>
          </div>
        </div>
        <div className="multi-agg--container">
          <div>
            <input type="checkbox" id="max-agg" checked={rollups.includes('max')} onChange={() => this.toggleRollup('max')} />
            <label htmlFor="max-agg">Maximum</label>
          </div>
          <div>
            <input type="checkbox" id="p90-agg" checked={rollups.includes('p90')} onChange={() => this.toggleRollup('p90')} />
            <label htmlFor="p90-agg">90th Percentile</label>
          </div>
          <div>
            <input type="checkbox" id="p95-agg" checked={rollups.includes('p95')} onChange={() => this.toggleRollup('p95')} />
            <label htmlFor="p95-agg">95th Percentile</label>
          </div>
          <div>
            <input type="checkbox" id="p99-agg" checked={rollups.includes('p99')} onChange={() => this.toggleRollup('p99')} />
            <label htmlFor="p99-agg">99th Percentile</label>
          </div>
        </div>
      </div>
    );

  }

  renderAggOptions() {
    const {
      selectedChartType,
      rollup,
      interpolateMissing,
    } = this.state;

    if (selectedChartType === 'COUNT') {
      return (
        <div className="chart-maker-agg-options--container">
          <label>Aggregate type</label>
          <Select
            value={rollup}
            onChange={this.handleRollupChange}
            options={AggregateSelectOptions.filter(option => option.value === 'count' || option.value === 'sum')}
          />
        </div>
      );
    } else if (selectedChartType === 'AREA') {
      return (
        <div>
          <div className="chart-maker-agg-options--container">
            <label>Aggregate type</label>
            {this.renderMultiAggOptions()}
          </div>
          <div>
            <label className="chart-type-container-label">Interpolate missing data points</label>
            <input type="checkbox" value={interpolateMissing} onChange={(e) => this.setState({ interpolateMissing: e.target.checked })}/>
          </div>
        </div>
      );
    } else if (selectedChartType === 'LINE' || selectedChartType === 'HISTOGRAM') {
      return (
        <div>
          <div className="chart-maker-agg-options--container">
            <label>Aggregate type</label>
            {this.renderMultiAggOptions()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderYAxisOptions() {
    const {
      yAxisLabel,
    } = this.state;

    return (
      <div>
        <label className="chart-type-container-label">Y Axis label</label>
        <input value={yAxisLabel} onChange={(e) => this.setState({ yAxisLabel: e.target.value })}/>
      </div>
    )
  }

  render() {
    const {
      selectedEvent,
      selectedChartType,
      saving,
      chartTitle,
    } = this.state;

    return (
      <div>
        <EventNameTypeahead onClick={(event) => this.setState({ selectedEvent: event.name, selectedChartType: null })}/>
        {selectedEvent && this.renderChartOptionsMaker()}
        {selectedChartType && this.renderAggOptions()}
        {selectedChartType && this.renderYAxisOptions()}
        {selectedChartType && this.renderChart()}
        {selectedChartType && <Button className="chart-maker-save--buton" size="large" disabled={chartTitle === "New Chart"} onClick={this.saveChart} loading={saving}>Save</Button>}
      </div>
    );
  }
}

export default withRouter(ChartMaker);
