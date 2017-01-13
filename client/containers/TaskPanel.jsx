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
      <Header incompleteCount={props.filteredTasks.filter(task => !task.checked).length} />

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
  shouldHideCompleted: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    filteredTasks: ((state) => {
      const project = state.projects.items[state.projects.selectedProject];
      return (project && project.tasksOrder && project.tasksOrder
        .map(taskId => state.tasks.items[taskId])
        .filter(task => !task.checked)) || [];
    })(state),
    shouldHideCompleted: state.taskFilters.hideCompleted,
    // ProjectId to insert the task into
    projectId: state.projects.selectedProject || ''
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
