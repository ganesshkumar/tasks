import React from 'react';

export const renderName = ({ input, label, type, meta: { touched, error, warning } }) =>
  renderField("username", { input, label, type, meta: { touched, error, warning } })

export const renderPassword = ({ input, label, type, meta: { touched, error, warning } }) =>
  renderField("password", { input, label, type, meta: { touched, error, warning } })

const renderField = (fieldType, { input, label, type, meta: { touched, error, warning } }) => {
  var icon = <span className="pt-icon pt-icon-person"></span>
  if (fieldType === "password") {
    icon = <span className="pt-icon pt-icon-lock"></span>
  }

  return (
    <div className="pt-input-group pt-large">
      {icon}
      <input {...input} className="pt-input" placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
}

export const validate = values => {
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

export const warn = values => {
  const warnings = {}
  return warnings
}
