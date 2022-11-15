import "./App.css";
import { React, useEffect, useState } from "react";

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
  const [projectList, setProjectList] = useState(getLocalStorage());
  const [newProject, setNewProject] = useState("");
  const [currentProject, setCurrentProject] = useState("");
  const [isShownProject, setIsShowProject] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [todoProjectEditing, setTodoProjectEditing] = useState(null);
  const [editingProject, setEditingProject] = useState("");
  const [todoTaskEditing, setTodoTaskEditing] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  //Section that handles when a new project is submitted.
  const handleProjectSubmit = (event) => {
    event.preventDefault();

    let project = {
      id: new Date().getTime().toString(),
      projectName: newProject,
      tasks: [],
    };
    setProjectList([...projectList, project]);
    setNewProject("");
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  //Handles when a new project is selected from the project list.
  const selectProject = (event) => {
    setCurrentProject(event.target.innerHTML);

    if (isShownProject === false) setIsShowProject(true);
  };

  //Handles when the current project (the project selected) is changed.
  useEffect(() => {
    if (currentProject !== "") {
      let newArr = projectList.filter(
        (project) => project.projectName === currentProject
      )[0].tasks;
      setTaskList(newArr);
    }
  }, [currentProject]);

  //Section that handles when a new task is submitted.
  const handleTaskSubmit = (event) => {
    event.preventDefault();

    let selectedProject = projectList.find(function (projectList, index) {
      if (projectList.projectName == currentProject) return true;
    });

    let task = {
      id: new Date().getTime().toString(),
      taskName: newTask,
    };

    selectedProject.tasks[selectedProject.tasks.length] = task;
    setProjectList(projectList);
    setNewTask("");
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  const editProject = (id) => {
    const updatedProjects = [...projectList].map((project) => {
      if (project.id === id) {
        project.projectName = editingProject;
      }
      return project;
    });
    setCurrentProject(editingProject);
    setProjectList(updatedProjects);
    setTodoProjectEditing(null);
    setEditingProject("");
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  //Deletes the selected project.
  const deleteProject = (id) => {
    setProjectList(projectList.filter((project) => project.id !== id));
    setCurrentProject("");
    setIsShowProject(false);
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  const completeTask = (id) => {};

  const editTask = (id) => {
    const updatedTasks = [...taskList].map((task) => {
      if (task.id === id) {
        task.taskName = editingTask;
      }
      return task;
    });
    setTaskList(updatedTasks);
    setTodoTaskEditing(null);
    setEditingTask("");
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  //Deletes the selected task.
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  return (
    <div className="Main">
      <header className="Header">
        <h1> Project Tracker </h1>
      </header>
      <div className="Body">
        <section className="Project">
          <div className="List">
            <h2 className="Header2">Projects List</h2>
            {projectList.map((project) => {
              return (
                <ul key={project.id}>
                  <li>
                    {todoProjectEditing === project.id ? (
                      <input
                        type="text"
                        placeholder="Edit Project Title"
                        required
                        onChange={(e) => setEditingProject(e.target.value)}
                        value={editingProject}
                        className="Input"
                      />
                    ) : (
                      <button onClick={selectProject}>
                        {project.projectName}
                      </button>
                    )}
                    {todoProjectEditing === project.id ? (
                      <button onClick={() => editProject(project.id)}>
                        Submit Edits
                      </button>
                    ) : (
                      <button onClick={() => setTodoProjectEditing(project.id)}>
                        Edit Project
                      </button>
                    )}
                    <button onClick={() => deleteProject(project.id)}>
                      Delete Project
                    </button>
                  </li>
                </ul>
              );
            })}
          </div>
          <form onSubmit={handleProjectSubmit} className="Form">
            <label>Enter Project Title</label>
            <input
              type="text"
              required
              placeholder="Enter Project Title"
              onChange={(event) => setNewProject(event.target.value)}
              value={newProject}
              className="Input"
            />
            <button>Submit Project</button>
          </form>
        </section>
        {isShownProject && (
          <section value={currentProject} className="Tasks">
            <div className="List">
              <h2 className="Header2">{currentProject} Tasks</h2>
              {taskList.map((task) => {
                return (
                  <ul key={task.id}>
                    <li>
                      {todoTaskEditing === task.id ? (
                        <input
                          type="text"
                          placeholder="Edit Task Name"
                          required
                          onChange={(e) => setEditingTask(e.target.value)}
                          value={editingTask}
                          className="Input"
                        />
                      ) : (
                        <button onClick={() => completeTask(task.id)}>
                          {task.taskName}
                        </button>
                      )}
                      {todoTaskEditing === task.id ? (
                        <button onClick={() => editTask(task.id)}>
                          Submit Edits
                        </button>
                      ) : (
                        <button onClick={() => setTodoTaskEditing(task.id)}>
                          Edit Task
                        </button>
                      )}
                      <button onClick={() => deleteTask(task.id)}>
                        Delete Task
                      </button>
                    </li>
                  </ul>
                );
              })}
            </div>
            <form onSubmit={handleTaskSubmit} className="Form">
              <label>Enter Task Name</label>
              <input
                type="text"
                required
                placeholder="Enter Task Name"
                onChange={(event) => setNewTask(event.target.value)}
                value={newTask}
                className="Input"
              />
              <button>Submit Task</button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
