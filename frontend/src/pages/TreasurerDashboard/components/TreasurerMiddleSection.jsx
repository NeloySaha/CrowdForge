import { useState } from "react";
import { TreCurrentEvents } from "./TreCurrentEvents";
import { TreFinance } from "./TreFinance";
import { Announcements } from "../../../components/Announcements";

export const TreasurerMiddleSection = (props) => {
  const [curTab, setCurTab] = useState("announcements");

  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });
  return (
    <section className="tre-middle-section">
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
            onClick={() => setCurTab("curEvents")}
            style={currentStyle(curTab === "curEvents")}
          >
            Ongoing Events
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("finance")}
            style={currentStyle(curTab === "finance")}
          >
            Finance
          </button>
        </li>
      </ul>

      <div>{curTab === "announcements" && <Announcements {...props} />}</div>
      <div>{curTab === "curEvents" && <TreCurrentEvents {...props} />}</div>
      <div>{curTab === "finance" && <TreFinance {...props} />}</div>
    </section>
  );
};
