import axios from "axios";
import React from "react";

export const EventCard = ({
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
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const participateFunc = async () => {
    try {
      const dataObj = {
        email: loggedUser.email,
        event_id,
        club: loggedUser.club,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/participate`,
        dataObj
      );
      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    }
  };

  return (
    <div className="event-box">
      <ul className="event-category-list">
        <li>
          <p>Event Name:</p>
          <p>{name}</p>
        </li>

        <li>
          <p>Venue:</p>
          <p>{venue}</p>
        </li>

        <li>
          <p>Date:</p>
          <p>{formattedDate}</p>
        </li>
      </ul>

      {club_name === loggedUser.club && <button>Volunteer</button>}
      <button onClick={participateFunc}>Participate</button>
    </div>
  );
};
