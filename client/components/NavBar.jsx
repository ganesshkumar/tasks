import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import {
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let popoverContent = (
      <ul className={'pt-menu pt-elevation-1'}>
          <li className={'pt-menu-divider'}></li>
          <li>
              <a className={'pt-menu-item'} onClick={this.props.handleLogout}>
                Logout
              </a>
          </li>
      </ul>
    );

    return (
      <nav className="navbar pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading"> <h3>Tasks</h3> </div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Popover content={popoverContent}
                   interactionKind={PopoverInteractionKind.CLICK}
                   position={Position.BOTTOM_RIGHT}
                   useSmartPositioning={true}>
            <a className={'pt-button pt-minimal'}>
              <span className={'pt-icon-standard pt-icon-cog pt-icon-large'}></span>
            </a>
          </Popover>
        </div>
      </nav>
    );
  }
}
