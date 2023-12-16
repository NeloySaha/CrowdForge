import axios from "axios";
import React, { useEffect, useState } from "react";
import { UpcomingEventCard } from "./UpcomingEventCard";
import { ParticipatingEventCard } from "./ParticipatingEventCard";
import { VolunEventCard } from "./VolunEventCard";
import { Announcements } from "../../../components/Announcements";
import { SectionLoader } from "../../../components/SectionLoader";

export const EventsContainer = (props) => {
  const [upEventLoading, setUpEventLoading] = useState(false);
  const [parEventLoading, setParEventLoading] = useState(false);
  const [volEventLoading, setVolEventLoading] = useState(false);
  const [upEventData, setUpEventData] = useState([]);
  const [parEventData, setParEventData] = useState([]);
  const [volunEventData, setVolunEventData] = useState([]);
  const [curTab, setCurTab] = useState("ann");
  const { email } = props.loggedUser;

  const getUpcomingEventsData = async () => {
    try {
      setUpEventLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/upcomingEvents/${email}`
      );

      setUpEventData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setUpEventLoading(false);
    }
  };

  const getParEventsData = async () => {
    try {
      setParEventLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/participatingEvents/${email}`
      );

      setParEventData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setParEventLoading(false);
    }
  };

  const getVolunEventsData = async () => {
    try {
      setVolEventLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/volunteerEvents/${email}`
      );

      setVolunEventData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setVolEventLoading(false);
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
      <UpcomingEventCard key={idx} {...newProps} />
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
      <ul className="dash-nav">
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("ann")}
            style={currentStyle(curTab === "ann")}
          >
            Announcements
          </button>
        </li>
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

      {curTab === "ann" && (
        <div className="events-container">
          <div className="events">
            <Announcements {...props} />
          </div>
        </div>
      )}

      {curTab === "upcoming" && (
        <div className="events-container">
          <h1 className="section-heading">Upcoming Events</h1>
          {upEventLoading ? (
            <SectionLoader />
          ) : (
            <div className="events">{upcomingEventCards}</div>
          )}
        </div>
      )}

      {curTab === "participate" && (
        <div className="events-container">
          <h1 className="section-heading">Participating Events</h1>
          {parEventLoading ? (
            <SectionLoader />
          ) : (
            <div className="events">{parEventCards}</div>
          )}
        </div>
      )}

      {curTab === "volunteer" && (
        <div className="events-container">
          <h1 className="section-heading">Volunteering Events</h1>
          {volEventLoading ? (
            <SectionLoader />
          ) : (
            <div className="events">{volunEventCards}</div>
          )}
        </div>
      )}
    </section>
  );
};
