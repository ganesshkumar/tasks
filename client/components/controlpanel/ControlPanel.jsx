import React from 'react';
import { connect } from 'react-redux';

import ProjectForm from './ProjectForm';

const ControlPanel = (props) => {
  return (
    <div>
      <h5> Projects </h5>
      <div>
        <ProjectForm />
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
