import { useState } from "react";
import { Announcements } from "../../../components/Announcements";
import { CreateEvent } from "./CreateEvent";
import { ClubDetail } from "./ClubDetail";
import { MonitorClub } from "./MonitorClub";

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
            onClick={() => setCurTab("createEvent")}
            style={currentStyle(curTab === "createEvent")}
          >
            Create Event
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("monitor")}
            style={currentStyle(curTab === "monitor")}
          >
            Monitor Club
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("detail")}
            style={currentStyle(curTab === "detail")}
          >
            Club Details
          </button>
        </li>
      </ul>

      <div>{curTab === "announcements" && <Announcements {...props} />}</div>
      <div>{curTab === "createEvent" && <CreateEvent {...props} />}</div>
      <div>{curTab === "monitor" && <MonitorClub {...props} />}</div>
      <div>{curTab === "detail" && <ClubDetail {...props} />}</div>
    </section>
  );
};
