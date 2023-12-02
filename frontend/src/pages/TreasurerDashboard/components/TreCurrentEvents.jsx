import React, { useEffect, useState } from "react";

import axios from "axios";
import { TreCurEventCard } from "./TreCurEventCard";

export const TreCurrentEvents = (props) => {
  const [eventData, setEventData] = useState([]);
  const { club } = props.loggedUser;

  const getEventData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubEvents/${club}`
      );

      setEventData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const eventCards = eventData?.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
    };
    return <TreCurEventCard key={idx} {...newProps} />;
  });

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <div className="events-container">
      <h1 className="section-heading">Ongoing Events</h1>
      <div className="events">{eventCards}</div>
    </div>
  );
};
