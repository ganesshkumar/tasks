import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Field, reduxForm } from 'redux-form'
import { Meteor } from 'meteor/meteor';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const warn = values => {
  const warnings = {}
  return warnings
}

const renderName = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="pt-input-group pt-large">
    <span className="pt-icon pt-icon-person"></span>
    <input {...input} className="pt-input" placeholder={label} type={type}/>
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const renderPassword = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="pt-input-group pt-large">
    <span className="pt-icon pt-icon-lock"></span>
    <input {...input} className="pt-input" placeholder={label} type={type}/>
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const AccountsUIWrapper = (props) => {
  if (Meteor.user()) {
    return (
      <div> {Meteor.user.username} </div>
    );
  } else {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <div className="auth-form-container pt-control-group pt-vertical">
        <form onSubmit={handleSubmit}>
          <div className="pt-control-group pt-vertical">
            <Field name="username" type="text" component={renderName} label="Username"/>
            <Field name="password" type="password" component={renderPassword} label="Password"/>
            <button type="submit"className="pt-button pt-large pt-intent-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'auth',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  warn                     // <--- warning function given to redux-form
})(AccountsUIWrapper)
