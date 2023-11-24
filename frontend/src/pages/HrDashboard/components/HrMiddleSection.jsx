import { useState } from "react";
import { Announcements } from "../../../components/Announcements";
import { Monitor } from "./Monitor";
import { PendingApproval } from "./PendingApproval";

export const HrMiddleSection = (props) => {
  const [curTab, setCurTab] = useState("announcements");

  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });
  return (
    <section className="hr-middle-section">
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
            onClick={() => setCurTab("monitor")}
            style={currentStyle(curTab === "monitor")}
          >
            Monitor Members
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("pending")}
            style={currentStyle(curTab === "pending")}
          >
            Pending Approval
          </button>
        </li>
      </ul>

      <div>{curTab === "announcements" && <Announcements {...props} />}</div>
      <div>{curTab === "monitor" && <Monitor {...props} />}</div>
      <div>{curTab === "pending" && <PendingApproval {...props} />}</div>
    </section>
  );
};
