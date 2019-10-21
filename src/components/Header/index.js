import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';


class Header extends Component {
  render() {
    return (
      <div className="header-row">
        <NavLink to="/new-chart" exact={true} className="new-chart-button">New Chart</NavLink>
      </div>
    );
  }
}

export default Header;
