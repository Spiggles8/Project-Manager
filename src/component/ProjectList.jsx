import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// This component is for the Project List and includes editing, deleting, and selecting projects.
export default function ProjectList({
  projectList,
  setProjectList,
  currentProject,
  setCurrentProject,
  setIsShowProject,
  isShownProject,
  setTaskList,
}) {
  const [todoProjectEditing, setTodoProjectEditing] = useState(null);
  const [editingProject, setEditingProject] = useState("");

  //Handles when a project is in Editing Mode and the edits are submitted.
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

  //Deletes the selected project from the Project List
  const deleteProject = (id) => {
    setProjectList(projectList.filter((project) => project.id !== id));
    setCurrentProject("");
    setIsShowProject(false);

    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  //Handles when a new project is selected from the project list. Sets task list for the selected project.
  const selectProject = (event) => {
    setCurrentProject(event.target.innerHTML);
    if (isShownProject === false) setIsShowProject(true);

    let newArr = projectList.filter(
      (project) => project.projectName === event.target.innerHTML
    )[0].tasks;
    setTaskList(newArr);
  };

  return (
    <div className="ListContainer">
      <h2 className="Header2">Projects List</h2>
      {projectList.map((project) => {
        return (
          <ul key={project.id} className="ProjectListItems">
            <li className="ListItems">
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
                <button onClick={selectProject} className="ItemTitle">
                  {project.projectName}
                </button>
              )}
              {todoProjectEditing === project.id ? (
                <button onClick={() => editProject(project.id)}>
                  Submit Edits
                </button>
              ) : (
                <button onClick={() => setTodoProjectEditing(project.id)}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => deleteProject(project.id)}>
                <FaTrash />
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
