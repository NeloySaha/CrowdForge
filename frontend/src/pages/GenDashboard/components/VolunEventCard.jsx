import React from "react";

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
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
    </div>
  );
};
