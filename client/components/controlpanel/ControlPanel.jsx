import React from 'react';
import { connect } from 'react-redux';

import ProjectForm from './ProjectForm';
import { selectProject } from '../../actions/projectActions';

const ControlPanel = (props) => {
  const projects = Object.keys(props.projects).map(id => props.projects[id]);
  
  return (
    <div>
      <h5> Projects </h5>
      <div>
        {
          projects.map(project => (
            <div className='project'
                 key={project._id}
                 onClick={(event) => props.selectProject(project._id)}>
              <div className='name'>{project.name}</div>
            </div>
          ))
        }
        <div className='project'>
          <ProjectForm key='project-form'/>
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
