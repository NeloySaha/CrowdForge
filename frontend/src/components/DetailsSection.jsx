import { useState } from "react";
import { UserInfo } from "./UserInfo";
import { EditUserInfo } from "./EditUserInfo";

export const DetailsSection = (props) => {
  const [curTab, setCurTab] = useState("profile");

  const currentStyle = (cond) => ({
    borderBottom: cond ? "3px solid #1a76f5" : "",
  });
  return (
    <section className="detail-section">
      <ul className="dash-nav">
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("profile")}
            style={currentStyle(curTab === "profile")}
          >
            Your Info
          </button>
        </li>
        <li>
          <button
            className="auth-nav-btn"
            onClick={() => setCurTab("edit")}
            style={currentStyle(curTab === "edit")}
          >
            Edit Info
          </button>
        </li>
      </ul>

      {curTab === "profile" && (
        <div className="info-box">
          <h2 className="section-heading">Personal Information</h2>
          <div className="info">
            <UserInfo {...props} />
          </div>
        </div>
      )}
      {curTab === "edit" && (
        <div className="info-box">
          <h2 className="section-heading">Edit Your Information</h2>
          <div className="info">
            <EditUserInfo {...props} />
          </div>
        </div>
      )}
    </section>
  );
};
