import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

export default DueDate = (props) => {
  if (props.task.dueDate) {

    let dueDate = new Date(props.task.dueDate);
    let difference = moment(dueDate).diff(moment(new Date()), 'days');
    let dueDateClass = classnames({
      'over-due': difference < 0,
      'today': difference == 0,
      'this-week': difference > 0 && difference < 6,
      'someday': difference >= 6
    });

    return (
      <div className='due-date'>
        <span className={dueDateClass}> {moment(dueDate).fromNow()} </span>
      </div>
    );

  } else {
    return (
      <div className='due-date'></div>
    )
  }
};
