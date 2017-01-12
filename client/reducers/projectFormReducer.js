const projectFormReducer = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_NEW_PROJECT_FORM':
      return true;
    case 'HIDE_NEW_PROJECT_FORM':
      return false;
    default:
      return state;
  }
}

export default projectFormReducer;
