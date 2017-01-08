import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames';

import { ItemTypes } from '../../constants/ItemTypes';

//togglePrivate() {
//  Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
//}

const taskSource = {
  beginDrag(props) {
    return {
      _id: props.task._id,
      index: props.index
    };
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    const reorderedTodos = props.moveTask(dragIndex, hoverIndex);
    props.setTodos(reorderedTodos);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};


function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

var Task = (props) => {
  const { connectDropTarget, connectDragSource, isDragging } = props;

  const taskClassName = classnames({
    task: true,
    done: props.task.checked,
    hidden: isDragging,
    private: props.task.private,
  });

  const doneButtonClassName = classnames({
    "pt-button": true,
    "done-button": true,
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
  setTodos: PropTypes.func.isRequired
};

Task = DragSource(ItemTypes.TASK, taskSource, collectSource)(Task);
Task = DropTarget(ItemTypes.TASK, taskTarget, collectTarget)(Task);

export default Task;
