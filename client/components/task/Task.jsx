import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames';
import EditTask from './EditTask';
import { updateTask } from '../../actions/taskActions';
import { taskSource, collectSource } from './helpers/dragSourceHelper';
import { taskTarget, collectTarget} from './helpers/dropTargetHelper';
import { ItemTypes } from '../../constants/ItemTypes';
import DueDate from './DueDate';

import {
  Popover,
  PopoverInteractionKind,
  Position
} from '@blueprintjs/core';

var Task = (props) => {
  const { connectDropTarget, connectDragSource, isDragging } = props;

  const taskClassName = classnames({
    task: true,
    selected: props.task.selected,
    editing: props.task.editing,
    done: props.task.checked,
    hidden: isDragging
  });

  const doneButtonClassName = classnames({
    "pt-button": true,
    "done-button": true,
    "no-outline": true,
    "pt-icon-tick": props.task.checked
  });

  let moreMenuContent = (
    <ul className={'pt-menu pt-elevation-1'}>
        <li className={'pt-menu-divider'}></li>
        <li>
          <a className="pt-menu-item pt-icon-edit pt-popover-dismiss"
             onClick={(event) => {
               props.editTask(props.task._id);
               props.deselectTask(props.task._id);
             }}>
            Edit Task
          </a>
          <a className="pt-menu-item pt-icon-delete pt-intent-danger"
             onClick={(event) => Meteor.call('projects.removeTask', props.task.project, props.task._id)}>
            Delete Task
          </a>
        </li>
    </ul>
  );

  let renderTask = (props) => {
    return (
      <div className={taskClassName}>
        <div className="done-button-container">
          <button type="button"
                  className={doneButtonClassName}
                  onClick={(event) => Meteor.call('tasks.setChecked', props.task._id, !props.task.checked)}>
          </button>
        </div>

        <div className="main-container">
          <div className="text"> {props.task.text} </div>
          <div className="username"> {props.task.username} </div>
        </div>

        <div className="secondary-container">
          <DueDate task={props.task} />
        </div>

        <div className="more pt-align-right" onClick={(event) => props.selectTask(props.task._id)}>
          <Popover content={moreMenuContent}
                   onClose={(e) => props.task.selected && props.deselectTask(props.task._id)}
                   interactionKind={PopoverInteractionKind.CLICK}
                   position={Position.BOTTOM_RIGHT}
                   useSmartPositioning={true}>
            <a> <span className={'pt-icon-standard pt-icon-more'}></span> </a>
          </Popover>
        </div>
      </div>
    );
  }

  const onEditTaskSubmit = (values) => {
    let task = Object.assign({}, props.task, {
      text: values.editText,
      dueDate: values.dueDate
    });
    if ('editing' in task) {
      delete(task.editing);
    }
    // Todo: Move this to the callback from update call
    props.cancelEditTask(props.task._id);
    updateTask(task);

  }

  let renderEditTask = (props) => {
    return(
      <div>
        <EditTask task={props.task}
                  onSubmit={onEditTaskSubmit}
                  cancelEditTask={props.cancelEditTask}
                  initialValues = {{editText: props.task.text}}
                  isDragging={props.isDragging}/>
      </div>
    );
  }

  return connectDragSource(connectDropTarget(
      ((props) => props.task.editing ?
          (renderEditTask(props)) : renderTask(props))(props)
  ));
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveTask: PropTypes.func.isRequired,
  canMoveTask: PropTypes.func.isRequired,
  reorderTasksOrder: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  cancelEditTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  deselectTask: PropTypes.func.isRequired
};

Task = DragSource(ItemTypes.TASK, taskSource, collectSource)(Task);
Task = DropTarget(ItemTypes.TASK, taskTarget, collectTarget)(Task);

export default Task;
