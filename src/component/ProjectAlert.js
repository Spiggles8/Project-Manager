import React, { useEffect } from "react";

// component that handles the project alert functionality.
const ProjectAlert = ({ type, msg, removeProjectAlert, projectList }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeProjectAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [projectList]);
  return <p className={"alert alert-${type}"}>{msg}</p>;
};

export default ProjectAlert;
