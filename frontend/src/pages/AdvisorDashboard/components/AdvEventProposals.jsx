import { useState, useEffect } from "react";
import { EventProposalCard } from "./EventProposalCard";
import axios from "axios";

export const AdvEventProposals = (props) => {
  const [eventData, setEventData] = useState([]);
  const { club } = props.loggedUser;

  const getEventData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/eventProposals/${club}`
      );

      console.log(res.data);
      setEventData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const eventCards = eventData?.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
      getEventData,
    };
    return <EventProposalCard key={idx} {...newProps} />;
  });

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <div className="events-container">
      <h1 className="section-heading">New Event Proposals</h1>
      <div className="events">{eventCards}</div>
    </div>
  );
};
