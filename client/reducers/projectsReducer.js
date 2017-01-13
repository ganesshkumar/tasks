const projectsReducer = (state = {
  items: {},
  selectedProject: ''
}, action) => {
  switch (action.type) {
    case 'SYNC_PROJECTS':
      return Object.assign({}, state, {
        items: action.projects.reduce((map, project) => {
          map[project._id] = project
          return map;
        }, {}),
        lastSyncAt: action.lastSyncAt
      });
    case 'SELECT_PROJECT':
      return Object.assign({}, state, {
        selectedProject: action.projectId
      });
    case 'SET_DEFAULT_PROJECT':
      return Object.assign({}, state, {
        selectedProject:
            state.selectedProject ? state.selectedProject : action.projectId
      });
    default:
      return state;
  }
}

export default projectsReducer;
