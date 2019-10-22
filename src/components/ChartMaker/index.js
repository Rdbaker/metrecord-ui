import React, { Component } from 'react';

import EventNameTypeahead from 'containers/EventNameTypeahead';


class ChartMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEvent: null,
    };
  }

  renderChartOptionsMaker() {
    return (
      <div>this is the options for the chart</div>
    )
  }

  renderChart() {
    return (
      <div>this is the chart</div>
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
