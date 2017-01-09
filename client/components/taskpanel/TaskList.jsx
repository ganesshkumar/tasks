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
                   reorderTodos={props.reorderTodos}
             />
    })}
  </div>
);

const mapStateToProps = state => {
  return {
    filteredTasks: state.todoFilters.hideCompleted ?
        state.todos.filter(task => !task.checked) : state.todos,
    moveTask: (dragIndex, hoverIndex) => {
      var todos = state.todos.slice();
      var temp = todos[dragIndex];
      todos[dragIndex] = todos[hoverIndex];
      todos[hoverIndex] = temp;

      return todos;
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    reorderTodos: (todos) => dispatch(reorderTodos(todos))
  }
}

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  reorderTodos: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
