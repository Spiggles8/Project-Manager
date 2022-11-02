import "./App.css";
import React, { useState, useEffect } from "react";
import ProjectList from "./component/ProjectList";
import ProjectAlert from "./component/ProjectAlert";

//Gathers the project list from local storage.
const getLocalStorage = () => {
  let projectList = localStorage.getItem("projectList");

  //If there is nothing in
  if (projectList) {
    return (projectList = JSON.parse(localStorage.getItem("projectList")));
  } else {
    return [];
  }
};

const App = () => {
  // Sets Default status of all constants used.
  const [projectName, setProjectName] = useState("");
  const [projectList, setProjectList] = useState(getLocalStorage());
  const [isProjectEditing, setIsProjectEditing] = useState(false);
  const [editProjectID, setEditProjectID] = useState(null);
  const [projectAlert, setProjectAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  //Sets the project list to local storage when the project list changes.
  useEffect(() => {
    localStorage.setItem("projectList", JSON.stringify(projectList));
  }, [projectList]);

  //Function runs when the submit button is pressed
  const handleProjectSubmit = (e) => {
    e.preventDefault();

    // checks if there is an entry in the project name field, otherwise message requests user to corret it.
    if (!projectName) {
      showProjectAlert(true, "danger", "Please Enter Project Name");
    } else if (projectName && isProjectEditing) {
      setProjectList(
        projectList.map((item) => {
          if (item.id === editProjectID) {
            return { ...item, title: projectName };
          }
          return item;
        })
      );

      // resets form fields after project name entry.
      setProjectName("");
      setEditProjectID(null);
      setIsProjectEditing(false);

      //This determines if the the form is in to add or to edit.
      showProjectAlert(true, "success", "Value Changed");
    } else {
      showProjectAlert(true, "success", "Item Added to the List");
      const newProjectItem = {
        id: new Date().getTime().toString(),
        title: projectName,
      };

      // updates the project list with the new project item.
      setProjectList([...projectList, newProjectItem]);
      setProjectName("");
    }
  };

  // function that shows a project alert when an entry is attempted.
  const showProjectAlert = (show = false, type = "", msg = "") => {
    setProjectAlert({ show, type, msg });
  };

  // function that handles removing a project item when the delete button is pressed.
  const removeProjectItem = (id) => {
    showProjectAlert(true, "danger", "Item Removed from list");
    setProjectList(projectList.filter((item) => item.id !== id));
  };

  // function that handles editing a project item when the edit button is pressed.
  const editProjectItem = (id) => {
    const editProjectItem = projectList.find((item) => item.id === id);
    setIsProjectEditing(true);
    setEditProjectID(id);
    setProjectName(editProjectItem.title);
  };

  //Selects the Project Item
  const selectProjectItem = (id) => {
    return projectList.find((item) => item.id === id).title;
  };

  return (
    <div
      className="productivity-manager-app bg-[url('/public/bg_01.jpg')] bg-no-repeat bg-cover text-white "
      style={{ height: "100vh" }}
    >
      <header className="text-5xl text-orange-500">
        <h1 className="p-10">Productivity Manager</h1>
      </header>

      <div className="flex p-4">
        <form className="todo-form block" onSubmit={handleProjectSubmit}>
          {alert.show && (
            <ProjectAlert
              className=""
              {...alert}
              removeProjectAlert={showProjectAlert}
              projectList={projectList}
            />
          )}
          <input
            type="text"
            className="form-control block text-black"
            placeholder="Enter To-Do Item Here"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
          <button type="submit" className="add-todo-item-bttn w-40 p-4">
            {isProjectEditing ? "Edit" : "Submit"}
          </button>
        </form>
      </div>

      {projectList.length > 0 && (
        <div className="flex p-4">
          <div className="block">
            <h2 className="text-4xl text-orange-400 p-4">Projects List</h2>
            <ProjectList
              className=""
              items={projectList}
              selectProjectItem={selectProjectItem}
              removeProjectItem={removeProjectItem}
              editProjectItem={editProjectItem}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
