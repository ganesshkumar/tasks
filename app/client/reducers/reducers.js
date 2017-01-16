import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authForm from './authFormReducer';
import taskFilters from './taskFilterReducer';
import userReducer from './userReducer';
import tasksReducer from './tasksReducer';
import projectFormReducer from './projectFormReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
  tasks: tasksReducer,
  taskFilters: taskFilters,
  projects: projectsReducer,
  showNewProjectForm: projectFormReducer,
  user: userReducer,
  authForm: authForm,
  form: formReducer
});
