import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';


class Header extends Component {
  render() {
    return (
      <div>
        <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
        <NavLink to="/account" activeClassName="active">Account</NavLink>
      </div>
    );
  }
}

export default Header;
