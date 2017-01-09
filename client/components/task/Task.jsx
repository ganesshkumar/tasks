import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames';

import { taskSource, collectSource } from './helpers/dragSourceHelper';
import { taskTarget, collectTarget} from './helpers/dropTargetHelper';
import { ItemTypes } from '../../constants/ItemTypes';

//togglePrivate() {
//  Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
//}

var Task = (props) => {
  const { connectDropTarget, connectDragSource, isDragging } = props;

  const taskClassName = classnames({
    task: true,
    done: props.task.checked,
    hidden: isDragging
  });

  const doneButtonClassName = classnames({
    "pt-button": true,
    "done-button": true,
    "no-outline": true,
    "pt-icon-tick": props.task.checked
  });

  return connectDragSource(connectDropTarget(
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
  ));
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveTask: PropTypes.func.isRequired,
  reorderTodos: PropTypes.func.isRequired
};

Task = DragSource(ItemTypes.TASK, taskSource, collectSource)(Task);
Task = DropTarget(ItemTypes.TASK, taskTarget, collectTarget)(Task);

export default Task;
