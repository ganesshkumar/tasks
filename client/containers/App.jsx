import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../../imports/api/tasks';

import {
  signup, login, logout,
  loginFormSelected, signupFormSelected
} from '../actions/authActions';

import { EditableText} from "@blueprintjs/core";
import SubscribeComponent from '../helpers/SubscriberComponent';
import NavBar from '../components/NavBar'
import TaskPanel from './TaskPanel';
import ControlPanel from '../components/controlpanel/ControlPanel';
import AuthForm from '../components/auth/AuthForm';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribe('tasks');
    this.props.subscribe('projects');
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <AuthForm authForm={this.props.authForm}
                  handleSignup={this.props.handleSignup}
                  handleLogin={this.props.handleLogin}
                  loginLinkClicked={this.props.loginLinkClicked}
                  signupLinkClicked={this.props.signupLinkClicked}
        />
      );
    } else {
      return (
        <div>
          <header>
            <NavBar handleLogout={this.props.handleLogout} />
          </header>

          <div className='app-container'>
            <div className='control-panel-container'>
              <ControlPanel />
            </div>

            <div className='tasks-container'>
              <TaskPanel />
            </div>
          </div>

        </div>
      );
    }
  }
}

App.propTypes = {
  // Add props for functions
  authForm: PropTypes.string.isRequired,
  hideCompleted: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    authForm: state.authForm,
    incompleteCount: state.todos.filter(todo => !todo.checked).length,
    currentUser: Meteor.user()
  };
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignup: (values) => dispatch(signup(values.username, values.password)),
    handleLogin: (values) => dispatch(login(values.username, values.password)),
    handleLogout: (event) => dispatch(logout()),
    loginLinkClicked: (event) => dispatch(loginFormSelected()),
    signupLinkClicked: (event) => dispatch(signupFormSelected()),
    hideCompleted: (event) => dispatch(hideCompleted()),
    showCompleted: (event) => dispatch(showCompleted())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)
    (SubscribeComponent(App));
