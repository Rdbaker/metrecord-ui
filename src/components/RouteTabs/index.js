import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './style.css';

class RouteTabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activeTab = 0;
    const route = this.props.location.pathname;
    this.props.tabs.forEach((tab, i) => {
      if(route.indexOf(tab.route) >= 0) {
        activeTab = i;
      }
    })

    return (
      <div>
        <Route render={({history}) => (
          <div className="route-tabs--container">
            {this.props.tabs.map((tab, i) => (
              <div
                className={`route-tabs--tab ${i === activeTab ? 'active': ''}`}
                key={tab.label}
                onClick={() => history.push(tab.route)}
              >{tab.label}</div>
            ))}
          </div>
        )} />
      </div>
    );
  }
}

export default withRouter(RouteTabs);
