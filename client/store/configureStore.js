import { Tracker } from 'meteor/tracker';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers/reducers';
import { Tasks, TaskOrder } from '../../imports/api/tasks';
import { Projects } from '../../imports/api/projects';

const loggerMiddleware = createLogger();

export default (preloadedState) => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  Tracker.autorun(() => {
    store.dispatch({
      type: 'COMPUTE_ORDER_AND_SET_TODOS',
      todos: Tasks.find({}).fetch()
    });

    store.dispatch({
      type: 'SYNC_PROJECTS',
      projects: Projects.find({}).fetch()
    });
  });

  return store;
};
