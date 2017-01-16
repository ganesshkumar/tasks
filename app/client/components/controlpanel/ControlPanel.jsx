import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import ProjectForm from './ProjectForm';
import { selectProject } from '../../actions/projectActions';

import ProjectConstants from '../../constants/ProjectConstants';

const ControlPanel = (props) => {
  const projects = Object.keys(props.projects).map(id => props.projects[id]);

  isUserProject = (project) => project.name !== ProjectConstants.DEFAULT_PROJECT;

  renderProject = (project, icon) => {
    const projectClassName = classnames({
      project: true,
      default: !isUserProject(project),
      user: isUserProject(project)
    });

    return (
      <div className={projectClassName}
           key={project._id}
           onClick={(event) => props.selectProject(project._id)}>
        { icon }
        <span className='name'>{project.name}</span>
      </div>
    );
  }

  renderDefaultProjects = (projects) => (
    projects
      .filter(project => !isUserProject(project))
      .map(project => {
        if (project.name === ProjectConstants.DEFAULT_PROJECT) {
          icon = <span className="icon pt-icon-large pt-icon-inbox"></span>
          return renderProject(project, icon);
        } else {
          return renderProject(project);
        }
      })
  );

  renderUserProjects = (projects) => (
    projects
      .filter(project => isUserProject(project))
      .map(project => renderProject(project))
  );

  return (
    <div>
      {renderDefaultProjects(projects)}
      <h5 className='legend'> Projects </h5>
      <div>
        {renderUserProjects(projects)}
        <div className='project user'>
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
