import React, { Component } from 'react';


export default (name, WrappedComponent) =>
  class TrackedComponent extends Component {

    getRenderName() {
      return `${name}.render`
    }

    shouldComponentUpdate() {
      this.start = window.performance.now();
      return true;
    }

    componentDidUpdate() {
      window.metrecord.track(this.getRenderName(), window.performance.now() - this.start);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
