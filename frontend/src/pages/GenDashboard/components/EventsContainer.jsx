import axios from "axios";
import React, { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import { ParticipatingEventCard } from "./ParticipatingEventCard";
import { VolunEventCard } from "./VolunEventCard";

export const EventsContainer = (props) => {
  const [upEventData, setUpEventData] = useState([]);
  const [parEventData, setParEventData] = useState([]);
  const [volunEventData, setVolunEventData] = useState([]);
  const { email } = props.loggedUser;

  const getUpcomingEventsData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/upcomingEvents/${email}`
      );

      setUpEventData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getParEventsData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/participatingEvents/${email}`
      );

      setParEventData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVolunEventsData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/volunteerEvents/${email}`
      );

      setVolunEventData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const upcomingEventCards = upEventData?.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
    };
    return event.restriction === 1 &&
      event.club_name !== props.loggedUser.club ? (
      <div></div>
    ) : (
      <EventCard key={idx} {...newProps} />
    );
  });

  const parEventCards = parEventData.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
    };

    return <ParticipatingEventCard key={idx} {...newProps} />;
  });

  const volunEventCards = volunEventData.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
    };

    return <VolunEventCard key={idx} {...newProps} />;
  });

  useEffect(() => {
    console.log(upEventData);
  }, [upEventData]);

  useEffect(() => {
    getUpcomingEventsData();
    getParEventsData();
    getVolunEventsData();
  }, []);

  return (
    <div className="event-section">
      <div className="events-container">
        <h1 className="detail-section-heading">Upcoming Events</h1>

        {upcomingEventCards}
      </div>

      <div className="events-container">
        <h1 className="detail-section-heading">Participating Events</h1>

        {parEventCards}
      </div>

      <div className="events-container">
        <h1 className="detail-section-heading">Volunteering Events</h1>

        {volunEventCards}
      </div>
    </div>
  );
};
