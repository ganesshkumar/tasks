import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading"> <h3>Tasks</h3> </div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-cog"></button>
        </div>
      </nav>
    );
  }
}
