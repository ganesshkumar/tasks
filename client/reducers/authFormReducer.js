const authForm = (state = 'LOGIN_FORM', action) => {
  switch (action.type) {
    case 'LOGIN_FORM_SELECTED':
      return 'LOGIN_FORM';
    case 'SIGNUP_FORM_SELECTED':
      return 'SIGNUP_FORM'
    default:
      return state;
  }
}

export default authForm;
