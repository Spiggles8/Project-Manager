import "./App.css";
import { React, useState } from "react";
import ProjectList from "./component/ProjectList";
import ProjectForm from "./component/ProjectForm";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";
import ProjectAlert from "./component/ProjectAlert";
import TaskAlert from "./component/TaskAlert";

//Looks to see if there is a Project List in Local Storage.
const getLocalStorage = () => {
  if (
    localStorage.getItem("projectList") &&
    localStorage.getItem("projectList") !== null
  ) {
    return JSON.parse(localStorage.getItem("projectList"));
  } else {
    return [];
  }
};

const App = () => {
  //All Constants that will be used throughout the program.
  const [projectList, setProjectList] = useState(getLocalStorage());
  const [currentProject, setCurrentProject] = useState("");
  const [isShownProject, setIsShowProject] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [projectAlert, setProjectAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [taskAlert, setTaskAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Displays the Project Alert displays what changes were made in the Projects List.
  const showProjectAlert = (show = false, type = "", msg = "") => {
    setProjectAlert({ show, type, msg });
  };

  // Displays the Task Alert displays what changes were made in the Tasks List.
  const showTaskAlert = (show = false, type = "", msg = "") => {
    setTaskAlert({ show, type, msg });
  };

  return (
    <div className="Main">
      <header className="Header">
        <h1> Project Tracker </h1>
      </header>
      <div className="Body">
        <section className="Project">
          <ProjectList
            projectList={projectList}
            setProjectList={setProjectList}
            setCurrentProject={setCurrentProject}
            setIsShowProject={setIsShowProject}
            isShownProject={isShownProject}
            setTaskList={setTaskList}
            showProjectAlert={showProjectAlert}
          />
          <ProjectForm
            projectList={projectList}
            setProjectList={setProjectList}
            showProjectAlert={showProjectAlert}
          />
          {projectAlert.show && (
            <ProjectAlert
              projectList={projectList}
              {...projectAlert}
              removeProjectAlert={showProjectAlert}
            />
          )}
        </section>
        {isShownProject && (
          <section value={currentProject} className="Tasks">
            <TaskList
              projectList={projectList}
              currentProject={currentProject}
              taskList={taskList}
              setTaskList={setTaskList}
              showTaskAlert={showTaskAlert}
            />
            <TaskForm
              projectList={projectList}
              setProjectList={setProjectList}
              taskList={taskList}
              setTaskList={setTaskList}
              currentProject={currentProject}
              showTaskAlert={showTaskAlert}
            />
            {taskAlert.show && (
              <TaskAlert
                taskList={taskList}
                {...taskAlert}
                removeTaskAlert={showTaskAlert}
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
