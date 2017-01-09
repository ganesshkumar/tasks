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

export function setTodo(todos) {
  return {
    type: 'SET_TODOS',
    todos: todos,
    todosOrder: todos.map(todo => todo._id)
  }
}
