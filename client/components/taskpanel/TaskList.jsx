import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../task/Task';

import {
  editTask, cancelEditTask, selectTask, deselectTask, reorderTasksOrder
} from '../../actions/taskActions';

const TaskList = (props) => (
  <div>
    {props.filteredTasks.map((task, i) => {
      return <Task key={task._id}
                   index={i} task={task}
                   projectId={props.projectId}
                   moveTask={props.moveTask}
                   canMoveTask={props.canMoveTask}
                   editTask={props.editTask}
                   cancelEditTask={props.cancelEditTask}
                   selectTask={props.selectTask}
                   deselectTask={props.deselectTask}
                   reorderTasksOrder={props.reorderTasksOrder}
             />
    })}
  </div>
);

const mapStateToProps = state => {
  return {
    filteredTasks: ((state) => {
      var taskIds = (state.projects.selectedProject &&
          state.projects.items[state.projects.selectedProject].tasksOrder) || [];
      var tasks = taskIds.map(id => state.tasks.items[id])
                         .filter(task => task !== undefined)

      // Apply hide completed filter
      if (state.taskFilters.hideCompleted) {
        tasks = tasks.filter(task => !task.checked);
      }
      // Apply search filter
      if (state.form.search && state.form.search.values
          && state.form.search.values.searchTerm) {
        tasks = tasks.filter(
          task => task.text.includes(state.form.search.values.searchTerm));
      }
      return tasks;
    })(state),

    projectId: state.projects.selectedProject,

    canMoveTask: (dragIndex, hoverIndex) => {
      const dragTask = state.tasks.items[state.projects.items[state.projects.selectedProject].tasksOrder[dragIndex]];
      const hoverTask =  state.tasks.items[state.projects.items[state.projects.selectedProject].tasksOrder[hoverIndex]];

      // Return true only if both the todos are not completed
      return (!('checked' in dragTask && dragTask.checked) &&
                !('checked' in hoverTask && hoverTask.checked))
    },

    moveTask: (dragIndex, hoverIndex) => {
      var tasksOrder = state.projects.items[state.projects.selectedProject].tasksOrder;
      tasksOrder[dragIndex] = [tasksOrder[hoverIndex], tasksOrder[hoverIndex]=tasksOrder[dragIndex]][0];

      return tasksOrder;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reorderTasksOrder: (projectId, tasksOrder) => dispatch(reorderTasksOrder(projectId, tasksOrder)),
    editTask: (taskId) => dispatch(editTask(taskId)),
    cancelEditTask: (taskId) => dispatch(cancelEditTask(taskId)),
    selectTask: (taskId) => dispatch(selectTask(taskId)),
    deselectTask: (taskId) => dispatch(deselectTask(taskId)),
  }
}

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  reorderTasksOrder: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  moveTask: PropTypes.func.isRequired,
  canMoveTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  cancelEditTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  deselectTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
