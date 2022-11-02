import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

//component that handles how the project list is displayed.
const ProjectList = ({ items, removeProjectItem, editProjectItem }) => {
  const [isShown, setIsShown] = useState(true);

  // function that handles when a project is selected.
  const selectProject = (e) => {
    e.preventDefault();
    setIsShown((current) => !current);

    return e.target.innerText;
  };

  return (
    <div className="outside-container">
      <div className="project-list-container">
        {items.map((item) => {
          const { id, title } = item;
          return (
            <ul className="" key={id}>
              <li className="flex">
                <button
                  type="button"
                  className="selectProject-bttn"
                  onClick={selectProject}
                >
                  {title}
                </button>

                <div>
                  <button
                    type="button"
                    className="edit-bttn"
                    onClick={() => editProjectItem(id)}
                  >
                    {" "}
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="delete-bttn"
                    onClick={() => removeProjectItem(id)}
                  >
                    {" "}
                    <FaTrash />{" "}
                  </button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>

      <div
        className="to-do-list-container"
        style={{ display: isShown ? "block" : "none" }}
      >
        {/*Need to define project name*/}
      </div>
    </div>
  );
};
export default ProjectList;
