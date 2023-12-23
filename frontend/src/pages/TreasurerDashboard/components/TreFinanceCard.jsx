import React, { useState, useEffect } from "react";
import { LiaBuilding, LiaCalendar } from "react-icons/lia";
import { IoPeopleOutline, IoBan } from "react-icons/io5";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FundModal } from "../../../modals/FundModal";
import { TaskModal } from "../../../modals/TaskModal";
import { TreVolunteerCard } from "./TreVolunteerCard";
import axios from "axios";

export const TreFinanceCard = ({
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
  setLoggedUser,
  successToast,
  failedToast,
}) => {
  const [volData, setVolData] = useState([]);

  const getVolunteerData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/volTaskStatus/${event_id}`
      );

      setVolData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const props = {
    loggedUser,
    successToast,
    failedToast,
    event_id,
    money_received,
    setLoggedUser,
    getVolunteerData,
  };

  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const volunteerCards = volData.map((volObj) => {
    const newProps = {
      ...props,
      volObj,
    };
    return <TreVolunteerCard key={volObj.email} {...newProps} />;
  });

  useEffect(() => {
    getVolunteerData();
  }, []);

  return (
    <div className="detail-event-box">
      <p className="det-event-heading">{name}</p>

      <ul className="vol-event-categories">
        <li className="det-event-venue">
          <LiaBuilding size="1.8rem" color="#0052c3" />
          <p>{venue}</p>
        </li>

        <li className="det-event-capacity">
          <IoPeopleOutline size="1.8rem" color="#0052c3" />
          <p>{capacity} persons</p>
        </li>

        <li className="det-event-date">
          <LiaCalendar size="1.8rem" color="#0052c3" />
          <p>{formattedDate}</p>
        </li>

        <li className="det-event-restriction">
          <IoBan size="1.8rem" color="#0052c3" />
          <p>{restriction === 1 ? "Restricted Event" : "Unrestricted Event"}</p>
        </li>

        <li className="det-event-restriction">
          <FaBangladeshiTakaSign size="1.4rem" color="#0052c3" />
          <p>{money_received}</p>
        </li>
      </ul>

      <div className="vol-heading">
        {volunteerCards.length > 0 ? "Volunteers" : "No Volunteers Yet"}
      </div>
      {volunteerCards.length > 0 && (
        <div className="vol-card-container">
          <ul className="volunteer-category-title-bar">
            <li>Name</li>
            <li>Task</li>
            <li>Money</li>
            <li>Assign Task</li>
          </ul>
          <div className="monitor-cards">{volunteerCards}</div>
        </div>
      )}
    </div>
  );
};
