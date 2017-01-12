import { Meteor } from 'meteor/meteor';
import { reset } from 'redux-form';

export function getNewProjectForm() {
  return {
    type: 'SHOW_NEW_PROJECT_FORM'
  }
}

export function closeNewProjectForm() {
  return {
    type: 'HIDE_NEW_PROJECT_FORM'
  }
}

export function createProject(name) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('projects.create', name, (error, result) =>
        error ? reject(error) : resolve());
    })
    .then(() => dispatch(reset('newProject')))
    .then(() => dispatch(closeNewProjectForm()))
    .catch(error => console.error('creation of new project failed'));
  }
}
