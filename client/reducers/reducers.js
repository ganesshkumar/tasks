import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const computeTasksOrder = (todos, todosOrder, state) => {
  if (!todos || todos.length < 1) {
      return state;
  }
  const orderedTodos = [];
  // construct a map of todo._id, todo
  todos = todos.reduce((todosMap, todo) => {
    todosMap[todo._id] = todo;
    return todosMap;
  }, {});
  // Add todos to orderedTodos based on todosOrder
  todosOrder.forEach(id => {
    orderedTodos.push(todos[id]);
    delete todos[id]
  });
  // Add any element whose id was not in the todosOrder
  Object.keys(todos).forEach(_id => orderedTodos.push(todos[_id]));
  return orderedTodos;
}

const pushFinishedTasksToBottom = (todos, todosOrder) => {
  if (!todosOrder || todosOrder.length < 1) {
    return todosOrder;
  }
  // construct a map of todo._id, todo
  todos = todos.reduce((todosMap, todo) => {
    todosMap[todo._id] = todo;
    return todosMap;
  }, {});

  return todosOrder.filter(_id => !todos[_id].checked)
    .concat(todosOrder.filter(_id => todos[_id].checked));
}

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'COMPUTE_ORDER_AND_SET_TODOS':
      return computeTasksOrder(
        action.todos,
        pushFinishedTasksToBottom(action.todos, action.todosOrder),
        []
      );
    case 'SET_TODOS':
      return action.todos || state;
    case 'EDIT_TASK':
      currentTask = state.find(task => task._id == action.id);
      currentTask.editing = true;
      return state.slice();
    case 'CANCEL_EDIT_TASK':
      currentTask = state.find(task => task._id == action.id);
      ('editing' in currentTask) && delete(currentTask.editing);
      return state.slice();
    case 'SELECT_TASK':
      currentTask = state.find(task => task._id == action.id);
      currentTask.selected = true;
      return state.slice();
    case 'DESELECT_TASK':
      task = state.find(task => task._id == action.id);
      ('selected' in currentTask) && delete(currentTask.selected);
      return state.slice();
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    //case 'SIGNUP_REQUEST':
    //case 'LOGIN_REQUEST':
    //case 'SIGNUP_FAILURE':
    //case 'LOGIN_FAILURE':
    //case 'LOGOUT_REQUEST':
    //case 'LOGOUT_FAILURE':
    //  return state;
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return action.user;

    case 'LOGOUT_SUCCESS':
      return {};

    default:
      return state;
  }
}

const authForm = (state = 'LOGIN_FORM', action) => {
  switch (action.type) {
    case 'LOGIN_FORM_SELECTED':
      return 'LOGIN_FORM';
    case 'SIGNUP_FORM_SELECTED':
      return 'SIGNUP_FORM'
    default:
      return state;
  }
}

const todoFilters = (state = {
  hideCompleted: false
}, action) => {
    switch (action.type) {
      case 'HIDE_COMPLETED':
        return Object.assign({}, state, {
          hideCompleted: true
        });
      case 'SHOW_COMPLETED':
        return Object.assign({}, state, {
          hideCompleted: false
        });
      default:
        return state;
    }
}


export default combineReducers({
  todos: todoReducer,
  todoFilters: todoFilters,
  user: userReducer,
  authForm: authForm,
  form: formReducer
});
