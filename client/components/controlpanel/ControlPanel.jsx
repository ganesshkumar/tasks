import React from 'react';
import { connect } from 'react-redux';

import ProjectForm from './ProjectForm';
import { selectProject } from '../../actions/projectActions';

const ControlPanel = (props) => {
  return (
    <div>
      <h5> Projects </h5>
      <div>
        {
          props.projects.map(project => (
            <div className='project'
                 key={project._id}
                 onClick={(event) => props.selectProject(project._id)}>
              <div className='name'>{project.name}</div>
            </div>
          ))
        }
        <div className='project'>
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
  // Todo: Fill this proptypes
}

const mapStateToProps = state => {
  return {
    projects: state.projects.items,
    selectedProject: state.projects.selectedProject
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectProject: (projectId) => dispatch(selectProject(projectId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
