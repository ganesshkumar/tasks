import React from 'react';
import { DatePicker } from '@blueprintjs/datetime';
import moment from 'moment';

import {
  Popover,
  PopoverInteractionKind,
  Position,
  Tooltip
} from '@blueprintjs/core';

export const renderDatePicker = (props) => {
  let popoverContent = (
    <div className="duedate-picker">
      <div className="pt-button-group duedate-button-group pt-minimal">

        <Tooltip content="Today" position={Position.BOTTOM}>
          <a className="pt-button pt-icon-calendar pt-popover-dismiss"
             onClick={(event) => props.input.onChange(moment().startOf('day').toDate())}
             role="button">
            {moment().startOf('day').format('DD')}
          </a>
        </Tooltip>

        <Tooltip position={Position.BOTTOM}
            content={"Tomorrow, " + moment().startOf('day')
              .add({days: 1}).format('DD MMM')} >
          <a className="pt-button pt-icon-chevron-right pt-popover-dismiss"
             onClick={(event) => props.input.onChange(moment().startOf('day').add({days: 1}).toDate())}
             role="button">
          </a>
        </Tooltip>

        <Tooltip position={Position.BOTTOM}
            content={"Next week, " + moment().startOf('day')
              .add({weeks: 1}).format('DD MMM')} >
          <a className="pt-button pt-icon-double-chevron-right pt-popover-dismiss"
             onClick={(event) => props.input.onChange(moment().startOf('day').add({weeks: 1}).toDate())}
             role="button">
          </a>
        </Tooltip>

        <Tooltip position={Position.BOTTOM}
            content={"Next month, " + moment().startOf('day')
              .add({months: 1}).format('DD MMM')} >
          <a className="pt-button pt-icon-timeline-events pt-popover-dismiss"
             onClick={(event) => props.input.onChange(moment().startOf('day').add({months: 1}).toDate())}
             role="button">
          </a>
        </Tooltip>

        <Tooltip position={Position.BOTTOM} content="No Due Date" >
          <a className="pt-button pt-icon-code pt-popover-dismiss"
             onClick={(event) => props.input.onChange('')}
             role="button">
          </a>
        </Tooltip>
      </div>
      <DatePicker
      className="pt-popover-dismiss"
        minDate={moment().startOf('day').toDate()}
        maxDate={moment().add({years: 10}).toDate()}
        defaultValue={props.currentValue}
        onChange={value => props.input.onChange(value)}/>
    </div>
  );

  return (
    <Popover content={popoverContent}
             interactionKind={PopoverInteractionKind.CLICK}
             position={Position.BOTTOM_LEFT}
             useSmartPositioning={true}>
      <a> <span className={'pt-icon-standard pt-icon-calendar'}></span> </a>
    </Popover>
  );
}
