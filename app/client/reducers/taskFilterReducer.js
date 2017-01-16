const taskFilters = (state = {
  hideCompleted: false
}, action) => {
    switch (action.type) {
      case 'HIDE_COMPLETED':
        return Object.assign({}, state, {
          hideCompleted: true
        });
      case 'SHOW_COMPLETED':
        return Object.assign({}, state, {
          hideCompleted: false
        });
      default:
        return state;
    }
}

export default taskFilters;
