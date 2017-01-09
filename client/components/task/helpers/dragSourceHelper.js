export function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export const taskSource = {
  beginDrag(props) {
    return {
      _id: props.task._id,
      index: props.index
    };
  }
};
