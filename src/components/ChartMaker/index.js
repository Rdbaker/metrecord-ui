import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartLine, faChartArea, faTally } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';

import EventNameTypeahead from 'containers/EventNameTypeahead';

import './style.css';


const ChartTypes = {
  HISTOGRAM: 'HISTOGRAM',
  LINE: 'LINE',
  AREA: 'AREA',
  COUNT: 'COUNT',
};


class ChartMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvent: null,
      selectedChartType: null,
    };
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
    return (
      <div>
        this is the chart
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
