import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../task/Task';
import { reorderTodos } from '../../actions/taskActions';

const TaskList = (props) => (
  <div>
    {props.filteredTasks.map((task, i) => {
      return <Task key={task._id}
                   index={i}
                   task={task}
                   moveTask={props.moveTask}
                   canMoveTask={props.canMoveTask}
                   reorderTodos={props.reorderTodos}
             />
    })}
  </div>
);

const mapStateToProps = state => {
  return {
    filteredTasks: state.todoFilters.hideCompleted ?
        state.todos.filter(task => !task.checked) : state.todos,

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
    reorderTodos: (todos) => dispatch(reorderTodos(todos))
  }
}

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  reorderTodos: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  canMoveTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
