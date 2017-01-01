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

export default combineReducers({
  todos: todoReducer,
  forms: formReducer,
});
