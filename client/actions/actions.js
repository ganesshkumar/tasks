import { Meteor } from 'meteor/meteor';

function signupRequest(username, password) {
  return {
    type: 'SIGNUP_REQUEST',
    username: username
  }
}

function signupResponse(username, response) {
  return {
    type: 'SIGNUP_RESPONSE',
    username: username,
    response: response,
    receivedAt: Date.now()
  }
}

export function signup(username, password) {
  return dispatch => {
    dispatch(signupRequest(username, password))
    return new Promise(resolve => {
      Meteor.call('accounts.signup', username, password);
      resolve();
    }).then(json => dispatch(signupResponse(username)));
  }
}


const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })
