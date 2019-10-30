import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartLine, faChartArea, faTally } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';

import { ChartsAPI } from 'api/charts';
import ChartDateSelect from 'components/ChartDateSelect';
import GenericChart from 'components/GenericChart';
import EventNameTypeahead from 'containers/EventNameTypeahead';
import Button from 'components/shared/Button';
import { ChartTypeToAPICall, ChartTypes } from 'modules/charts/constants';

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
      saving: false,
      saved: false,
      saveError: null,
    };
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
    } = this.state;

    const {
      currentUser,
      dispatcher: {
        receiveChart,
      },
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
      saving,
    } = this.state;

    if (!selectedChartType || !selectedEvent) {
      return null;
    }

    return (
      <div>
        <label className="chart-type-container-label">Pick chart dates</label>
        <ChartDateSelect onChange={({ start, end }) => this.fetchChartData(start, end)} className="chart-maker--date-select"/>
        <div className="chart-maker-generic--container">
          <GenericChart
            type={selectedChartType}
            event={selectedEvent}
            fetchChartData={this.fetchChartData}
            neverFetched={chartDataNeverFetched}
            data={chartData}
            loading={chartDataLoading}
            title={chartTitle}
            onTitleChange={this.changeTitle}
            size="full"
          />
        </div>
        <Button className="chart-maker-save--buton" size="large" disabled={chartTitle === "New Chart"} onClick={this.saveChart} loading={saving}>Save</Button>
      </div>
    )
  }

  render() {
    const {
      selectedEvent,
      selectedChartType,
    } = this.state;

    return (
      <div>
        <EventNameTypeahead onClick={(event) => this.setState({ selectedEvent: event.name, selectedChartType: null })}/>
        {selectedEvent && this.renderChartOptionsMaker()}
        {selectedChartType && this.renderChart()}
      </div>
    );
  }
}

export default ChartMaker;
