import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

export const TaskModal = (props) => {
  const {
    taskModalOn,
    setTaskModalOn,
    loggedUser,
    setLoggedUser,
    volObj,
    event_id,
    money_received,
    successToast,
    failedToast,
    getVolunteerData,
  } = props;
  const [inpData, setInpData] = useState({ money: "", task: "" });
  const taskModalRef = useRef();

  const handleChange = (e) => {
    setInpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const assignTask = async () => {
    try {
      const assignedData = {
        event_id,
        email: volObj.email,
        club: loggedUser.club,
        money: +inpData.money,
        task: inpData.task,
      };

      console.log(assignedData);

      if (+inpData.money > money_received) {
        failedToast("Cost Limit exceeded for this event");
        throw new Error("Cost Limit exceeded for this event");
      }

      if (+inpData.money > loggedUser.money) {
        failedToast("Not enough money");
        throw new Error("Not enough money");
      }

      const res1 = await axios.post(
        `${import.meta.env.VITE_API_URL}/volTaskAssign`,
        assignedData
      );

      const res2 = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        clubName: loggedUser.club,
        email: loggedUser.email,
        password: loggedUser.password,
      });

      if (res1.status === 200) {
        setLoggedUser(res2.data[0]);
        successToast(res1.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTaskModalOn(false);
      getVolunteerData();
    }
  };

  useEffect(() => {
    if (taskModalOn) {
      taskModalRef.current?.showModal();
    } else {
      taskModalRef.current?.close();
    }
  }, [taskModalOn]);

  return ReactDOM.createPortal(
    <dialog className="modal" ref={taskModalRef}>
      <button className="modal-exit-btn" onClick={() => setTaskModalOn(false)}>
        <IoClose size="1.8rem" color="#eb3656" />
      </button>
      <form
        className="modal-form"
        onSubmit={(e) => {
          e.preventDefault();
          assignTask();
        }}
      >
        <div className="modal-form--category">
          <p>
            Task: <span>*</span>
          </p>
          <input
            type="text"
            name="task"
            placeholder="Enter Task"
            value={inpData.task}
            onChange={handleChange}
          />
        </div>

        <div className="modal-form--category">
          <p>
            Amount: <span>*</span>
          </p>
          <input
            min="0"
            type="number"
            name="money"
            placeholder="Enter Fund Amount"
            value={inpData.money}
            onChange={handleChange}
          />
        </div>

        <div className="modal-btn-container">
          <button className="eventbtn volbtn">Confirm</button>
          <button
            type="button"
            className="eventbtn parbtn"
            onClick={() => setTaskModalOn(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("portal")
  );
};
