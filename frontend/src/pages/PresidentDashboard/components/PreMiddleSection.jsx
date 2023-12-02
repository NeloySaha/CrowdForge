import { useState } from "react";
import { Announcements } from "../../../components/Announcements";
import { CreateEvent } from "./CreateEvent";
import { PreMonitor } from "./PreMonitor";
import { CreateAnnouncement } from "./CreateAnnouncement";
import { PresEvents } from "./PresEvents";
import { PromotionApprovals } from "./PromotionApprovals";

export const PreMiddleSection = (props) => {
  const [curTab, setCurTab] = useState("announcements");

  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });
  return (
    <section className="pre-middle-section">
      <ul className="dash-nav">
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("announcements")}
            style={currentStyle(curTab === "announcements")}
          >
            Announcements
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("createAnn")}
            style={currentStyle(curTab === "createAnn")}
          >
            Create Announcement
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("createEvent")}
            style={currentStyle(curTab === "createEvent")}
          >
            Create Event
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("ongoingEvent")}
            style={currentStyle(curTab === "ongoingEvent")}
          >
            Ongoing Events
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("monitor")}
            style={currentStyle(curTab === "monitor")}
          >
            Monitor
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("promotion")}
            style={currentStyle(curTab === "promotion")}
          >
            Promotion Requests
          </button>
        </li>
      </ul>

      <div>{curTab === "announcements" && <Announcements {...props} />}</div>
      <div>{curTab === "createAnn" && <CreateAnnouncement {...props} />}</div>
      <div>{curTab === "createEvent" && <CreateEvent {...props} />}</div>
      <div>{curTab === "ongoingEvent" && <PresEvents {...props} />}</div>
      <div>{curTab === "monitor" && <PreMonitor {...props} />}</div>
      <div>{curTab === "promotion" && <PromotionApprovals {...props} />}</div>
    </section>
  );
};
