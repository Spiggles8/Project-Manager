import { useEffect } from "react";

//Handles the task alert displaying for a period of time. 
export default function TaskAlert({type, msg, removeTaskAlert, taskList}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeTaskAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [taskList]);
  return <p className={"alert alert-${type}"}>{msg}</p>;
}
