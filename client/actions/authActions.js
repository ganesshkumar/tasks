import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import ProjectConstants from '../constants/ProjectConstants';
// Action and helpers for signup

function signupRequest(username, password) {
  return {
    type: 'SIGNUP_REQUEST',
    username: username
  }
}

function signupSuccess(user) {
  return {
    type: 'SIGNUP_SUCCESS',
    user: user,
    receivedAt: Date.now()
  }
}

function signupFailure(username, error) {
  return {
    type: 'SIGNUP_FAILURE',
    username: username,
    error: error,
    receivedAt: Date.now()
  }
}

export function signup(username, password) {
  return dispatch => {
    dispatch(signupRequest(username, password));
    return new Promise((resolve, reject) => {
      Accounts.createUser({
        username,
        password
      }, (error) => error ? reject(error) : resolve());
    })
    .then(() => Meteor.call('projects.create', ProjectConstants.DEFAULT_PROJECT))
    .then(() => dispatch(signupSuccess(Meteor.user())))
    .catch(error => dispatch(signupFailure(username, error)));
  }
}

// Action and helpers for login

function loginRequest(username, password) {
  return {
    type: 'LOGIN_REQUEST',
    username: username
  }
}

function loginSuccess(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user: user,
    receivedAt: Date.now()
  }
}

function loginFailure(username, error) {
  return {
    type: 'LOGIN_FAILURE',
    username: username,
    error: error,
    receivedAt: Date.now()
  }
}

export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest(username, password));
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(username, password,
        (error) => error ? reject(error) : resolve());
    })
    .then(() => dispatch(loginSuccess(Meteor.user())))
    .catch(error => dispatch(loginFailure(username, error)));
  }
}

// Action and helpers for logout

function logoutRequest() {
  return {
    type: 'LOGOUT_REQUEST'
  }
}

function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS',
    receivedAt: Date.now()
  }
}

function logoutFailure(error) {
  return {
    type: 'LOGOUT_FAILURE',
    error: error,
    receivedAt: Date.now()
  }
}

export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return new Promise((resolve, reject) => {
      Meteor.logout((error) => error ? reject(error) : resolve());
    })
    .then(() => dispatch(logoutSuccess()))
    .catch(error => dispatch(logoutFailure(error)));
  }
}

// Actions to switch auth form

export function signupFormSelected() {
  return {
    type: 'SIGNUP_FORM_SELECTED'
  };
}

export function loginFormSelected() {
  return {
    type: 'LOGIN_FORM_SELECTED'
  };
}
