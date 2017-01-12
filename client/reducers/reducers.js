import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authForm from './authFormReducer';
import todoFilters from './todoFilterReducer';
import userReducer from './userReducer';
import todoReducer from './tasksReducer';
import projectFormReducer from './projectFormReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
  todos: todoReducer,
  todoFilters: todoFilters,
  projects: projectsReducer,
  showNewProjectForm: projectFormReducer,
  user: userReducer,
  authForm: authForm,
  form: formReducer
});
