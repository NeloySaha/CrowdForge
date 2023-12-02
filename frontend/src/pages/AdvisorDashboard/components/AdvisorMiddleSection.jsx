import { useState } from "react";
import { AdvCurrentEvents } from "./AdvCurrentEvents";
import { AdvEventProposals } from "./AdvEventProposals";

export const AdvisorMiddleSection = (props) => {
  const [curTab, setCurTab] = useState("curEvents");

  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });
  return (
    <section className="adv-middle-section">
      <ul className="dash-nav">
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
            onClick={() => setCurTab("eventProposals")}
            style={currentStyle(curTab === "eventProposals")}
          >
            Event Proposals
          </button>
        </li>
      </ul>

      <div>{curTab === "curEvents" && <AdvCurrentEvents {...props} />}</div>
      <div>
        {curTab === "eventProposals" && <AdvEventProposals {...props} />}
      </div>
    </section>
  );
};
