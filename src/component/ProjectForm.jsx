import { useState } from "react";

// This component handles the Project Form. When submitted adds to the Project List.
export default function ProjectForm({ projectList, setProjectList }) {
  const [newProject, setNewProject] = useState("");

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

  return (
    <form onSubmit={handleProjectSubmit} className="Form">
      <input
        type="text"
        required
        placeholder="Enter New Project Title"
        onChange={(event) => setNewProject(event.target.value)}
        value={newProject}
        className="Input"
      />
      <button>Add Project</button>
    </form>
  );
}
