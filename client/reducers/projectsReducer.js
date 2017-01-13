const projectsReducer = (state = {
  items: [],
  selectedProject: ''
}, action) => {
  switch (action.type) {
    case 'SYNC_PROJECTS':
      return Object.assign({}, state, {
        items: action.projects
      });
    case 'SELECT_PROJECT':
      return Object.assign({}, state, {
        selectedProject: action.projectId
      });
    default:
      return state;
  }
}

export default projectsReducer;
