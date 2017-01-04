import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.todos || state;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
    case 'LOGIN_REQUEST':
    case 'SIGNUP_FAILURE':
    case 'LOGIN_FAILURE':
      return state;
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return action.user;
    case 'LOGOUT_REQUEST':
      return state;
    case 'LOGOUT_SUCCESS':
      return {};
    case 'LOGOUT_FAILURE':
      return state;
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

export default combineReducers({
  todos: todoReducer,
  user: userReducer,
  authForm: authForm,
  form: formReducer
});
