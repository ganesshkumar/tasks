import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { hideCompleted, showCompleted } from '../actions/filterActions';

import SubscribeComponent from '../helpers/SubscriberComponent';
import Header from '../components/taskpanel/Header';
import NewTask from '../components/taskpanel/NewTask';
import CompletedFilter from '../components/taskpanel/CompletedFilter';
import TaskList from '../components/taskpanel/TaskList';

const TaskPanel = (props) => {

  const toggleHideCompleted = (event) => {
    if (props.shouldHideCompleted) {
      props.showCompleted();
    } else {
      props.hideCompleted();
    }
  }

  const handleNewTask = (values) => {
    event.preventDefault();
    Meteor.call('tasks.insert', values.task);
  }

  return (
    <div>
      <Header incompleteCount={props.incompleteCount} />

      <NewTask onSubmit={handleNewTask}/>

      <CompletedFilter shouldHideCompleted={props.shouldHideCompleted}
                       toggleHideCompleted={toggleHideCompleted} />

      <TaskList filteredTasks={props.filteredTasks} />
    </div>
  );
}

TaskPanel.propTypes = {
  hideCompleted: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  filteredTasks: PropTypes.array.isRequired,
  shouldHideCompleted: PropTypes.bool.isRequired,
  incompleteCount: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    tasks: state.todos,
    filteredTasks: state.todoFilters.hideCompleted ?
        state.todos.filter(task => !task.checked) : state.todos,
    shouldHideCompleted: state.todoFilters.hideCompleted,
    incompleteCount: state.todos.filter(todo => !todo.checked).length,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    hideCompleted: () => dispatch(hideCompleted()),
    showCompleted: () => dispatch(showCompleted())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(TaskPanel));
