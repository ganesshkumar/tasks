import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../../imports/api/tasks.js';

import SubscribeComponent from '../helpers/SubscriberComponent';
import Task from '../components/Task.jsx';
import AccountsUIWrapper from '../components/AccountsUIWrapper.jsx';


// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
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
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }

        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  subscribe: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    tasks: state.todos,
    incompleteCount: state.todos.filter(todo => !todo.checked).length,
    currentUser: Meteor.user()
  };
}

const mapDispatchToProps = state => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)
    (SubscribeComponent(App));
