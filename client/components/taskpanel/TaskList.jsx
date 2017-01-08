import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../task/Task';
import { setTodos } from '../../actions/taskActions';

const TaskList = (props) => (
  <div>
    {props.filteredTasks.map((task, i) => {
      return <Task key={task._id}
                   index={i}
                   task={task}
                   moveTask={props.moveTask}
                   setTodos={props.setTodos}
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
    setTodos: (todos) => dispatch(setTodos(todos))
  }
}

TaskList.propTypes = {
  filteredTasks: PropTypes.array.isRequired,
  moveTask: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
