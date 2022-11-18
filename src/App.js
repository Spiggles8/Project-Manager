import "./App.css";
import { React, useState } from "react";
import ProjectList from "./component/ProjectList";
import ProjectForm from "./component/ProjectForm";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";

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
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            setIsShowProject={setIsShowProject}
            isShownProject={isShownProject}
            setTaskList={setTaskList}
          />
          <ProjectForm
            projectList={projectList}
            setProjectList={setProjectList}
          />
        </section>
        {isShownProject && (
          <section value={currentProject} className="Tasks">
            <TaskList
              projectList={projectList}
              currentProject={currentProject}
              taskList={taskList}
              setTaskList={setTaskList}
            />
            <TaskForm
              projectList={projectList}
              setProjectList={setProjectList}
              taskList={taskList}
              setTaskList={setTaskList}
              currentProject={currentProject}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
