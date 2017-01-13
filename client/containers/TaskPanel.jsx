import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';

import ProjectConstants from '../constants/ProjectConstants';
import { hideCompleted, showCompleted } from '../actions/filterActions';
import { createTask } from '../actions/taskActions';

import SubscribeComponent from '../helpers/SubscriberComponent';
import Header from '../components/taskpanel/Header';
import NewTask from '../components/taskpanel/NewTask';
import CompletedFilter from '../components/taskpanel/CompletedFilter';
import TaskList from '../components/taskpanel/TaskList';

const TaskPanel = (props) => {

  console.error('log', props.projectId)
  const toggleHideCompleted = (event) => {
    if (props.shouldHideCompleted) {
      props.showCompleted();
    } else {
      props.hideCompleted();
    }
  }

  const handleNewTask = (values) => {
    event.preventDefault();
    props.createTask(values.task, props.projectId);
  }

  return (
    <div>
      <Header incompleteCount={props.incompleteCount} />

      <NewTask onSubmit={handleNewTask.bind(this)} />

      <CompletedFilter shouldHideCompleted={props.shouldHideCompleted}
                       toggleHideCompleted={toggleHideCompleted} />

      <TaskList />
    </div>
  );
}

TaskPanel.propTypes = {
  projectId: PropTypes.string.isRequired,
  createTask: PropTypes.func.isRequired,
  hideCompleted: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  filteredTasks: PropTypes.array.isRequired,
  shouldHideCompleted: PropTypes.bool.isRequired,
  incompleteCount: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    filteredTasks: state.todoFilters.hideCompleted ?
        state.todos.filter(task => !task.checked) : state.todos,
    shouldHideCompleted: state.todoFilters.hideCompleted,
    incompleteCount: state.todos.filter(todo => !todo.checked).length,
    // ProjectId to insert the task into
    projectId: ((state) => {
      if (state.projects.selectedProject ) {
        return state.projects.selectedProject;
      } else if (state.projects.items && state.projects.items.length > 0) {
        return state.projects.items
          .filter(project => project.name === ProjectConstants.DEFAULT_PROJECT)
          .map(defaultProject => defaultProject ? defaultProject._id : '')[0];
      } else {
        return '';
      }
    })(state)
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: (text, projectId) => dispatch(createTask(text, projectId)),
    hideCompleted: () => dispatch(hideCompleted()),
    showCompleted: () => dispatch(showCompleted())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(SubscribeComponent(TaskPanel)));
