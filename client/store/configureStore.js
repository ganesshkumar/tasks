import { Tracker } from 'meteor/tracker';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers/reducers';
import { Tasks, TaskOrder } from '../../imports/api/tasks';
import { Projects } from '../../imports/api/projects';

import ProjectConstants from '../constants/ProjectConstants';

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
    const tasks = Tasks.find({}).fetch();
    const projects = Projects.find({}).fetch();

    store.dispatch({
      type: 'SYNC_TASKS',
      tasks: tasks,
      lastSyncAt: new Date()
    });

    store.dispatch({
      type: 'SYNC_PROJECTS',
      projects: projects,
      lastSyncAt: new Date()
    });

    if (!store.projects || !store.projects.selectedProject) {
      store.dispatch({
        type: 'SET_DEFAULT_PROJECT',
        projectId: projects
            .filter(project => project.name === ProjectConstants.DEFAULT_PROJECT)
            .map(project => (project && project._id) ? project._id : '')[0] || ''
      });
    }
  });

  return store;
};
