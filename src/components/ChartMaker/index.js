import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartLine, faChartArea, faTally } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';

import GenericChart from 'components/GenericChart/index';
import EventNameTypeahead from 'containers/EventNameTypeahead';

import './style.css';
import { EventsAPI } from 'api/events';


const ChartTypes = {
  HISTOGRAM: 'HISTOGRAM',
  LINE: 'LINE',
  AREA: 'AREA',
  COUNT: 'COUNT',
};

const ChartTypeToAPICall = {
  HISTOGRAM: () => ([]),
  LINE: () => ([]),
  AREA: () => ([]),
  COUNT: EventsAPI.fetchCount,
};


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
    const fetchStart = start || new Date(+fetchEnd + 1000 * 60 * 60 * 3);
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
    } = this.state;

    if (!selectedChartType || !selectedEvent) {
      return null;
    }

    return (
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
    )
  }

  render() {
    const {
      selectedEvent,
    } = this.state;

    return (
      <div>
        <EventNameTypeahead onClick={(event) => this.setState({ selectedEvent: event.name })}/>
        {selectedEvent && this.renderChartOptionsMaker()}
        {selectedEvent && this.renderChart()}
      </div>
    );
  }
}

export default ChartMaker;
