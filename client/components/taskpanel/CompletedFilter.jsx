import React from 'react';

export default CompletedFilter = (props) => (
  <div className="hide-completed">
    <label className="pt-control pt-switch">
      <input type="checkbox"
        checked={props.shouldHideCompleted}
        onChange={props.toggleHideCompleted}/>
      <span className="pt-control-indicator"></span>
      Hide Completed
    </label>
  </div>
);
