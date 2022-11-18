import { useEffect } from "react";

//Handles the project alert displaying for a period of time. 
export default function ProjectAlert({type, msg, removeProjectAlert, projectList}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeProjectAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [projectList]);
  return <p className={"alert alert-${type}"}>{msg}</p>;
}
