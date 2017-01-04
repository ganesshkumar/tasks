import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Field, reduxForm } from 'redux-form'
import { Meteor } from 'meteor/meteor';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default AuthForm = (props) => {
    // Default to more used LoginForm
    var form = <LoginForm onSubmit={props.handleLogin}
                          signupLinkClicked={props.signupLinkClicked} />

    if (props.authForm == 'SIGNUP_FORM') {
      form = <SignupForm onSubmit={props.handleSignup}
                         loginLinkClicked={props.loginLinkClicked} />
    }

    return (
      <div className="auth-container">
        {form}
      </div>
    );
}
