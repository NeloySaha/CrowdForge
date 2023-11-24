import axios from "axios";
import React, { useEffect, useState } from "react";
import { EventCard } from "./EventCard";
import { ParticipatingEventCard } from "./ParticipatingEventCard";
import { VolunEventCard } from "./VolunEventCard";

export const EventsContainer = (props) => {
  const [upEventData, setUpEventData] = useState([]);
  const [parEventData, setParEventData] = useState([]);
  const [volunEventData, setVolunEventData] = useState([]);
  const [curTab, setCurTab] = useState("upcoming");
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
      getUpcomingEventsData,
      getParEventsData,
      getVolunEventsData,
    };
    return event.restriction === 1 &&
      event.club_name !== props.loggedUser.club ? (
      ""
    ) : (
      <EventCard key={idx} {...newProps} />
    );
  });

  const parEventCards = parEventData?.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
      getUpcomingEventsData,
      getParEventsData,
      getVolunEventsData,
    };

    return <ParticipatingEventCard key={idx} {...newProps} />;
  });

  const volunEventCards = volunEventData?.map((event, idx) => {
    const newProps = {
      ...props,
      ...event,
    };

    return <VolunEventCard key={idx} {...newProps} />;
  });

  useEffect(() => {
    getUpcomingEventsData();
    getParEventsData();
    getVolunEventsData();
  }, []);

  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });

  return (
    <section className="event-section">
      <ul className="auth-nav">
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("upcoming")}
            style={currentStyle(curTab === "upcoming")}
          >
            Upcoming Events
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("participate")}
            style={currentStyle(curTab === "participate")}
          >
            Participating Events
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("volunteer")}
            style={currentStyle(curTab === "volunteer")}
          >
            Volunteering Events
          </button>
        </li>
      </ul>

      {curTab === "upcoming" && (
        <div className="events-container">
          <h1 className="section-heading">Upcoming Events</h1>
          <div className="events">{upcomingEventCards}</div>
        </div>
      )}

      {curTab === "participate" && (
        <div className="events-container">
          <h1 className="section-heading">Participating Events</h1>
          <div className="events">{parEventCards}</div>
        </div>
      )}

      {curTab === "volunteer" && (
        <div className="events-container">
          <h1 className="section-heading">Volunteering Events</h1>
          <div className="events">{expand ? eventDetails /> : volunEventCards}</div>
        </div>
      )}
    </section>
  );
};
