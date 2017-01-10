import { Meteor } from 'meteor/meteor';
import { reset } from 'redux-form';

export function createTask(text) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.insert', text, (error, result) =>
        error ? reject(error) : resolve());
    })
    .then(() => dispatch(reset('task')))
    .catch(error => console.error('creation of new task failed'));
  }
}

export function updateTask(task) {
  Meteor.call('tasks.update', task);
}

export function reorderTodos(todos) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.setOrder',
          Meteor.user()._id,
          todos.map(todo => todo._id),
          (error, result) => error ? reject(error): resolve()
      );
    })
    .catch(error => console.error('Reorder failed'));
  }
}

/**
 * Following actions affects only UI state
 */

export function editTask(taskId) {
  return {
    type: 'EDIT_TASK',
    id: taskId
  }
}

export function cancelEditTask(taskId) {
  return {
    type: 'CANCEL_EDIT_TASK',
    id: taskId
  }
}

export function selectTask(taskId) {
  return {
    type: 'SELECT_TASK',
    id: taskId
  }
}

export function deselectTask(taskId) {
  return {
    type: 'DESELECT_TASK',
    id: taskId
  }
}

export function setTodo(todos) {
  return {
    type: 'SET_TODOS',
    todos: todos,
    todosOrder: todos.map(todo => todo._id)
  }
}
