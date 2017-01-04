import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      task: true,
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    const buttonClassName = classnames({
      "pt-button": true,
      "done-button": true,
      "pt-icon-tick": this.props.task.checked
    });

    return (
      <div className={taskClassName}>
        <div>
            <button type="button"
                    className={buttonClassName}
                    onClick={this.toggleChecked.bind(this)}>
            </button>
        </div>
        <div className="text">
            {this.props.task.text}
        </div>
        <div className="username">
            {this.props.task.username}
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};
