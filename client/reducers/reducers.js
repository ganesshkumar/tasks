import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authForm from './authFormReducer';
import todoFilters from './todoFilterReducer';
import userReducer from './userReducer';
import todoReducer from './tasksReducer';

export default combineReducers({
  todos: todoReducer,
  todoFilters: todoFilters,
  user: userReducer,
  authForm: authForm,
  form: formReducer
});
