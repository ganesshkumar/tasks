import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Field, reduxForm } from 'redux-form';

import {
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';

const NavBar = (props) => {
  let popoverContent = (
    <ul className={'pt-menu pt-elevation-1'}>
        <li className={'pt-menu-divider'}></li>
        <li>
            <a className={'pt-menu-item'} onClick={props.handleLogout}>
              Logout
            </a>
        </li>
    </ul>
  );

  return (
    <nav className="navbar pt-navbar">
      <div className="navbar-container">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">
            <span className="title">Tasks</span>
          </div>
          <form className="search">
            <Field name="searchTerm"
                   type="text"
                   autoComplete={"off"}
                   component="input"
                   className="pt-input search-input"
                   placeholder="Search tasks"/>
          </form>
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
      </div>
    </nav>
  );
}


export default reduxForm({
  form: 'search',
})(NavBar)
