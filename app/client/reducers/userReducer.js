const userReducer = (state = {}, action) => {
  state = signupReducer(state, action);
  state = loginReducer(state, action);
  state = logoutReducer(state, action);
  return state;
}

const signupReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
    case 'SIGNUP_FAILURE':
      return state;
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, action.user);
    default:
      return state;
  }
}

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'LOGIN_FAILURE':
      return state;
    case 'LOGIN_SUCCESS':
      return Object.assign({}, action.user);
    default:
      return state;
  }
}

const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGOUT_REQUEST':
    case 'LOGOUT_FAILURE':
      return state;
    case 'LOGOUT_SUCCESS':
      return {};
    default:
      return state;
  }
}

export default userReducer;
