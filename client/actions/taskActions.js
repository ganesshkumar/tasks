import { Meteor } from 'meteor/meteor';

export function reorderTodos(todos) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.setOrder',
          Meteor.user()._id, todos.map(todo => todo._id),
          (error, result) => error ? reject(error): resolve()
      );
    })
    .then(() => console.log('Reorder success'))
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
