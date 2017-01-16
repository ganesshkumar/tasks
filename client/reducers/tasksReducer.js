export default tasksReducer = (state = {
  items: [],
  lastSyncAt: null
}, action) => {
  switch (action.type) {
    case 'SYNC_TASKS':
      return Object.assign({}, state, {
        items: action.tasks.reduce((map, task) => {
          map[task._id] = task;
          return map;
        }, {}),
        lastSyncAt: action.lastSyncAt
      });
    case 'SET_TASKS':
      // Todo
      return action.todos.slice();
    default:
      return uiTasksReducer(state, action);
  }
};

const uiTasksReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_TASK':
      return findTaskAndAddProperty(state, action.id, 'editing');
    case 'CANCEL_EDIT_TASK':
      return findTaskAndRemoveProperty(state, action.id, 'editing');
    case 'SELECT_TASK':
      return findTaskAndAddProperty(state, action.id, 'selected');
    case 'DESELECT_TASK':
      return findTaskAndRemoveProperty(state, action.id, 'selected');
    default:
      return state;
  }
}

// Helper functions

const findTaskAndAddProperty = (state, taskId, label) => {
  let currentTask = state.items[taskId];
  setAttribute(currentTask, label);
  return Object.assign({}, state);
}

const findTaskAndRemoveProperty = (state, taskId, label) => {
  let currentTask = state.items[taskId];
  removeAttribute(currentTask, label);
  return Object.assign({}, state);
}

const setAttribute = (task, label) => {
  task[label] = true;
}

const removeAttribute = (task, label) => {
  if (label in task) {
    delete(task[label]);
  }
}
