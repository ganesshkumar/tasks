import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

var EditTask = (props) => {
  const taskClassName = classnames({
    task: true,
    selected: props.task.selected,
    editing: props.task.editing,
    done: props.task.checked,
    hidden: props.isDragging
  });

  return (
    <div className={taskClassName}>
      <form className="editform" onSubmit={props.handleSubmit}>
        <Field name="editText"
               type="text"
               autoComplete={"off"}
               component="input"
               className="edit-input"
               value={props.task.text}/>

         <button type="submit"
                 className="edit-form-save-button pt-button pt-intent-primary">
           Submit
         </button>
         <button type="button"
                 className="edit-form-cancel-button pt-button pt-intent-danger"
                 onClick={(event) => props.cancelEditTask(props.task._id)}>
           Cancel
         </button>
      </form>
    </div>
  );
}

EditTask = reduxForm({
  form: 'editTask',
})(EditTask);

export default EditTask;
