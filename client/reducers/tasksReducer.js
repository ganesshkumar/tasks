export default tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'COMPUTE_ORDER_AND_SET_TODOS':
      return action.todos;
    case 'SET_TODOS':
      return action.todos.slice();
    default:
      return uiTasksReducer(state, action);
  }
  return state;
};

const uiTasksReducer = (state =[], action) => {
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

const findTaskAndAddProperty = (tasks, taskId, label) => {
  let currentTask = findTaskById(tasks, taskId);
  setAttribute(currentTask, label);
  return tasks.slice();
}

const findTaskAndRemoveProperty = (tasks, taskId, label) => {
  currentTask = findTaskById(tasks, taskId);
  removeAttribute(currentTask, label);
  return tasks.slice();
}

const findTaskById = (tasks, taskId) => {
  return tasks.find(task => task._id === taskId);
}

const setAttribute = (task, label) => {
  task[label] = true;
}

const removeAttribute = (task, label) => {
  if (label in task) {
    delete(task[label]);
  }
}

// Helpers to compute the order of tasks being shown

const computeTasksOrder = (todos, todosOrder, state) => {
  if (!todos || todos.length < 1) {
      return state;
  }
  const orderedTodos = [];
  // construct a map of todo._id, todo
  todos = todos.reduce((todosMap, todo) => {
    todosMap[todo._id] = todo;
    return todosMap;
  }, {});
  // Add todos to orderedTodos based on todosOrder
  todosOrder.forEach(id => {
    orderedTodos.push(todos[id]);
    delete todos[id]
  });
  // Add any element whose id was not in the todosOrder
  Object.keys(todos).forEach(_id => orderedTodos.push(todos[_id]));
  return orderedTodos;
}

const pushFinishedTasksToBottom = (todos, todosOrder) => {
  if (!todosOrder || todosOrder.length < 1) {
    return todosOrder;
  }
  // construct a map of todo._id, todo
  todos = todos.reduce((todosMap, todo) => {
    todosMap[todo._id] = todo;
    return todosMap;
  }, {});

  return todosOrder.filter(_id => !todos[_id].checked)
    .concat(todosOrder.filter(_id => todos[_id].checked));
}
