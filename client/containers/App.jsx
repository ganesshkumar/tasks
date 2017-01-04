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
import Task from '../components/Task';
import AuthForm from '../components/auth/AuthForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false
    };

    this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
  }

  componentWillMount() {
    this.props.subscribe('tasks');
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
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

          <div className="container">
            <div>
              <h1>Todo List ({this.props.incompleteCount})</h1>

              <div className="hide-completed">
                <label className="pt-control pt-switch">
                  <input type="checkbox"
                    checked={this.state.hideCompleted}
                    onChange={this.toggleHideCompleted}/>
                  <span className="pt-control-indicator"></span>
                  Hide Completed
                </label>
              </div>

              <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                <input type="text"
                    ref="textInput"
                    className="text"
                  placeholder="Type to add new tasks"/>
              </form>

              <div>
                {this.renderTasks()}
              </div>
            </div>
          </div>

        </div>
      );
    }
  }
}

App.propTypes = {
  authForm: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    authForm: state.authForm,
    tasks: state.todos,
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
    signupLinkClicked: (event) => dispatch(signupFormSelected())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)
    (SubscribeComponent(App));
