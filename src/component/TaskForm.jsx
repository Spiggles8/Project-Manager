import { useState } from "react";

// This component handles the Task Form. When submitted adds to the Project & Task List.
export default function TaskForm({
  projectList,
  setProjectList,
  taskList,
  setTaskList,
  currentProject,
  showTaskAlert
}) {
  const [newTask, setNewTask] = useState("");

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

    setTaskList([...taskList, task]);
    selectedProject.tasks[selectedProject.tasks.length] = task;
    setProjectList(projectList);

    showTaskAlert(true, "success", "Task Sucessfully Added to Project");

    setNewTask("");

    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  return (
    <form onSubmit={handleTaskSubmit} className="Form">
      <input
        type="text"
        required
        placeholder="Enter New Task Name"
        onChange={(event) => setNewTask(event.target.value)}
        value={newTask}
        className="Input"
      />
      <button>Add Task</button>
    </form>
  );
}
