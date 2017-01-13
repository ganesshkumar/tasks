import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../task/Task';

import {
  editTask, cancelEditTask, selectTask, deselectTask, reorderTodos
} from '../../actions/taskActions';

const TaskList = (props) => (
  <div>
    {props.filteredTasks.map((task, i) => {
      return <Task key={task._id}
                   index={i} task={task}
                   moveTask={props.moveTask}
                   canMoveTask={props.canMoveTask}
                   editTask={props.editTask}
                   cancelEditTask={props.cancelEditTask}
                   selectTask={props.selectTask}
                   deselectTask={props.deselectTask}
                   reorderTodos={props.reorderTodos}
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

    canMoveTask: (dragIndex, hoverIndex) => {
      const dragTodo = state.todos[dragIndex];
      const hoverTodo = state.todos[hoverIndex];

      // Return true only if both the todos are not completed
      return (!('checked' in dragTodo && dragTodo.checked) &&
                !('checked' in hoverTodo && hoverTodo.checked))
    },

    moveTask: (dragIndex, hoverIndex) => {
      var todos = state.todos.slice();
      todos[dragIndex] = [todos[hoverIndex], todos[hoverIndex]=todos[dragIndex]][0];

      return todos;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reorderTodos: (todos) => dispatch(reorderTodos(todos)),
    editTask: (taskId) => dispatch(editTask(taskId)),
    cancelEditTask: (taskId) => dispatch(cancelEditTask(taskId)),
    selectTask: (taskId) => dispatch(selectTask(taskId)),
    deselectTask: (taskId) => dispatch(deselectTask(taskId)),
  }
}

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  reorderTodos: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  canMoveTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  cancelEditTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  deselectTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
