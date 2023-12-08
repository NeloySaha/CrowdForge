import React, { useEffect, useState } from "react";
import { LiaBuilding, LiaCalendar } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import axios from "axios";

export const VolunEventCard = ({
  capacity,
  club_name,
  cost,
  date,
  event_id,
  money_received,
  name,
  venue,
  restriction,
  loggedUser,
  successToast,
  failedToast,
}) => {
  const [taskData, setTaskData] = useState({});
  const [taskDone, setTaskDone] = useState(false);

  const getTaskData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/assignedEventTask`,
        {
          club: loggedUser.club,
          email: loggedUser.email,
          event_id,
        }
      );

      console.log(res.data[0]);
      setTaskData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const completeTask = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/completeTask`,
        {
          club: loggedUser.club,
          email: loggedUser.email,
          event_id,
        }
      );

      successToast(res.data);
    } catch (err) {
      failedToast(err?.response.data);
      console.log(err);
    } finally {
      getTaskData();
    }
  };

  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    getTaskData();
  }, []);
  return (
    <div className="event-box">
      <div className="event-head-container">
        <div>
          <p className="event-title">{name}</p>
        </div>
        <p className="event-host">
          Arranged By <span>{club_name}</span>
        </p>
      </div>

      <ul className="event-category-list">
        <li className="event-venue">
          <LiaBuilding size="1.8rem" color="#0052c3" />
          <p>{venue}</p>
        </li>

        <li className="event-capacity">
          <IoPeopleOutline size="1.8rem" color="#0052c3" />
          <p>{capacity} persons</p>
        </li>

        <li className="event-date">
          <LiaCalendar size="1.8rem" color="#0052c3" />
          <p>{formattedDate}</p>
        </li>
      </ul>

      {taskData.task !== null ? (
        taskData.money > 0 ? (
          <div className="vol-task-checkbox">
            <h2>Task Assigned</h2>
            <div>
              <input
                type="checkbox"
                id="scales"
                name="task"
                onChange={() => setTaskDone((prev) => !prev)}
                checked={taskDone}
              />
              <label for="task">
                <p>{taskData.task}</p>
                <p>Money Received - TK{taskData.money}</p>
              </label>

              {taskDone && (
                <div>
                  <button className="task-btn-complete" onClick={completeTask}>
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="vol-task-checkbox">
            <h2>Task Assigned</h2>
            <div>
              <input
                type="checkbox"
                id="scales"
                name="task"
                checked={true}
                onChange={() => {}}
              />
              <label>
                <p>{taskData.task}</p>
                <p>Completed</p>
              </label>
            </div>
          </div>
        )
      ) : (
        <div className="vol-task-checkbox">
          <h2>No Tasks Assigned Yet</h2>
        </div>
      )}
    </div>
  );
};
