import React, { PropTypes }  from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {
  getNewProjectForm, closeNewProjectForm, createProject
} from '../../actions/projectActions';

var ProjectForm = (props) => {
  if (props.showNewProjectForm) {
    return (
      <form className='new-project-form' onSubmit={props.handleSubmit}>
        <Field name='projectName'
               type='text'
               autoFocus
               autoComplete={'off'}
               component='input'
               placeholder={'Project name'}
               className='project-name-input pt-input' />

        <div>
          <button type='submit'
                  className='save-button pt-button pt-intent-primary'>
            Submit
          </button>

          <button type='button'
                  className='cancel-button pt-button pt-intent-danger'
                  onClick={props.closeNewProjectForm}>
            Cancel
          </button>
       </div>
      </form>
    );
  } else {
    return (
      <div>
        <a className='pt-icon-small-plus' onClick={props.getNewProjectForm}>
           Add Project
        </a>
      </div>
    );
  }
}

ProjectForm.propTypes = {
  showNewProjectForm: PropTypes.bool.isRequired,
  getNewProjectForm: PropTypes.func.isRequired,
  closeNewProjectForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    showNewProjectForm: state.showNewProjectForm
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getNewProjectForm: () => dispatch(getNewProjectForm()),
    closeNewProjectForm: () => dispatch(closeNewProjectForm()),
    onSubmit: (values) => dispatch(createProject(values.projectName))
  };
}

ProjectForm = reduxForm({
  form: 'newProject',
})(ProjectForm);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
