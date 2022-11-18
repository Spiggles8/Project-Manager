import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

//This component handles the Task List and includes editing, deleting, and completing tasks.
export default function TaskList({
  projectList,
  currentProject,
  taskList,
  setTaskList,
  showTaskAlert
}) {
  const [editingTask, setEditingTask] = useState("");
  const [todoTaskEditing, setTodoTaskEditing] = useState(null);

  //Handles when a task is in Editing Mode and the edits are submitted.
  const editTask = (id) => {
    const updatedTasks = [...taskList].map((task) => {
      if (task.id === id) {
        task.taskName = editingTask;
      }
      return task;
    });
    setTaskList(updatedTasks);

    showTaskAlert(true, "success" ,"Task Name Changed Successfully");

    setTodoTaskEditing(null);
    setEditingTask("");
    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  //Future update to mark the task has been completed.
  const completeTask = (id) => {};

  //Deletes the selected task.
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));

    showTaskAlert(true, "danger" ,"Task Deleted Successfully");

    localStorage.setItem("projectList", JSON.stringify(projectList));
  };

  return (
    <div className="ListContainer">
      <h2 className="Header2">{currentProject} Tasks</h2>
      {taskList.map((task) => {
        return (
          <ul key={task.id} className="TaskListItems">
            <li className="ListItems">
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
                <button
                  onClick={() => completeTask(task.id)}
                  className="ItemTitle"
                >
                  {task.taskName}
                </button>
              )}
              {todoTaskEditing === task.id ? (
                <button onClick={() => editTask(task.id)}>Submit Edits</button>
              ) : (
                <button onClick={() => setTodoTaskEditing(task.id)}>
                  <FaEdit />
                </button>
              )}
              <button onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
