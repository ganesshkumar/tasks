import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { signupFormSelected } from '../../actions/authActions';

import { Field, reduxForm } from 'redux-form'
import { Meteor } from 'meteor/meteor';

import {
  validate, warn, renderName, renderPassword
} from '../../helpers/authHelpers';

const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="auth-form-container pt-control-group pt-vertical">
      <form onSubmit={handleSubmit}>
        <div className="pt-control-group pt-vertical">
          <Field name="username" type="text" component={renderName} label="Username"/>
          <Field name="password" type="password" component={renderPassword} label="Password"/>
          <button type="submit"className="pt-button pt-large pt-intent-primary">Login</button>
        </div>
      </form>

      <div className="auth-form-link-container pt-ui-text-large">
        Don't have an account? &nbsp;
        <span className="auth-form-link"
              onClick={props.signupLinkClicked}>
            Sign Up
        </span>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'auth',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(LoginForm)
