import React, { useState } from "react";
import { LiaBuilding, LiaCalendar } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

export const ParticipatingEventCard = ({
  capacity,
  club_name,
  date,
  event_id,

  name,
  venue,

  volun,
  loggedUser,
  successToast,
  failedToast,
  getUpcomingEventsData,
  getParEventsData,
  getVolunEventsData,
}) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const [volLoading, setVolLoading] = useState(false);

  const volFunc = async () => {
    try {
      setVolLoading(true);
      const dataObj = {
        email: loggedUser.email,
        event_id,
        club: loggedUser.club,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/volunteer`,
        dataObj
      );
      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setVolLoading(false);
      getUpcomingEventsData();
      getParEventsData();
      getVolunEventsData();
    }
  };

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

      <div className="event-btn-container">
        {club_name === loggedUser.club && volun !== 1 && (
          <button className="eventbtn volbtn" onClick={volFunc}>
            {!volLoading ? (
              "Volunteer"
            ) : (
              <ScaleLoader color="#fff" height={10} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
