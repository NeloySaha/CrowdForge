import React, { useState } from "react";
import { TaskModal } from "../../../modals/TaskModal";

export const TreVolunteerCard = (props) => {
  const { name, task, money } = props.volObj;

  const [taskModalOn, setTaskModalOn] = useState(false);
  const newProps = {
    ...props,
    taskModalOn,
    setTaskModalOn,
  };

  return (
    <div className="vol-card">
      <div className="vol-name">
        <p>{name}</p>
      </div>

      <div className="category">
        <p>{task === null ? "No tasks assigned yet" : task}</p>
      </div>

      <div className="category">
        <p>{money === null ? 0 : money}</p>
      </div>

      <div className="category">
        <button className="vol-card-btn" onClick={() => setTaskModalOn(true)}>
          Assign
        </button>
      </div>

      {taskModalOn && <TaskModal {...newProps} />}
    </div>
  );
};
