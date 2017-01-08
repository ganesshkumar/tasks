import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

//togglePrivate() {
//  Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
//}

const Task = (props) => {
  const taskClassName = classnames({
    task: true,
    done: props.task.checked,
    private: props.task.private,
  });

  const doneButtonClassName = classnames({
    "pt-button": true,
    "done-button": true,
    "pt-icon-tick": props.task.checked
  });

  return (
    <div className={taskClassName}>
      <div>
        <button type="button"
                className={doneButtonClassName}
                onClick={(event) => Meteor.call('tasks.setChecked', props.task._id, !props.task.checked)}>
        </button>
      </div>

      <div className="text">
        {props.task.text}
      </div>

      <div className="username">
        {props.task.username}
      </div>

      <div className="delete">
        <span className="pt-icon-standard pt-icon-delete delete-button"
              onClick={(event) => Meteor.call('tasks.remove', props.task._id)}>
        </span>
      </div>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;
