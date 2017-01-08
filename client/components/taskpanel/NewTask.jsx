import React from 'react';
import { Field, reduxForm } from 'redux-form';

const NewTask = (props) => {
  return (
    <div>
      <form className="new-task" onSubmit={props.handleSubmit} >
        <Field name="task"
               type="text"
               component="input"
               className="text-input"
               placeholder="Type to add a new task"/>
             <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default reduxForm({
  form: 'task',
})(NewTask)
