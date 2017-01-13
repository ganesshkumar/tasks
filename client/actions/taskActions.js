import { Meteor } from 'meteor/meteor';
import { reset } from 'redux-form';

export function createTask(text, projectId) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('projects.insertTask', text, projectId, (error, result) =>
        error ? reject(error) : resolve());
    })
    .then(() => dispatch(reset('task')))
    .catch(error => console.error('creation of new task failed'));
  }
}

export function updateTask(task) {
  Meteor.call('tasks.update', task);
}

export function reorderTasksOrder(projectId, tasksOrder) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('projects.reorderTasks',
          projectId, tasksOrder,
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
