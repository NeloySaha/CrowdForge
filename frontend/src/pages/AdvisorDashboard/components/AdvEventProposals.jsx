import { useState, useEffect } from "react";
import { EventProposalCard } from "./EventProposalCard";
import axios from "axios";
import { SectionLoader } from "../../../components/SectionLoader";

export const AdvEventProposals = (props) => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { club } = props.loggedUser;

  const getEventData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/eventProposals/${club}`
      );

      console.log(res.data);
      setEventData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      {!loading ? (
        eventCards.length > 0 ? (
          <div className="events">{eventCards}</div>
        ) : (
          <p className="no-pending-text">No event requests yet</p>
        )
      ) : (
        <SectionLoader />
      )}
    </div>
  );
};
