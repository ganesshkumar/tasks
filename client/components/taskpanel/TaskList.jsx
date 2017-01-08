import React from 'react';
import Task from '../task/Task';

export default TaskList = (props) => (
  <div>
    {props.filteredTasks.map((task) => {
      return <Task key={task._id} task={task} />
    })}
  </div>
);
