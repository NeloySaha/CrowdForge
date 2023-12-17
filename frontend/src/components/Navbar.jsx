import { useLocation } from "react-router-dom";
import { IoAnalyticsSharp } from "react-icons/io5";

export const Navbar = ({ setLoggedUser }) => {
  let userType;
  const location = useLocation();

  if (location.pathname === "/genDashboard") {
    userType = "Member";
  } else if (location.pathname === "/humanResource") {
    userType = "HR";
  } else if (location.pathname === "/president") {
    userType = "President";
  } else if (location.pathname === "/advisor") {
    userType = "Advisor";
  } else if (location.pathname === "/treasurer") {
    userType = "Treasurer";
  }

  return (
    <nav
      style={{
        display: location.pathname === "/" ? "none" : "",
      }}
    >
      <div className="logo-container">
        <IoAnalyticsSharp size="5.2rem" color="#fff" />
        <h1 className="nav-heading">CrowdForge</h1>
      </div>

      <div>
        <h1 className="nav-info">{userType} Dashboard</h1>
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          setLoggedUser({});
        }}
      >
        Log Out
      </button>
    </nav>
  );
};
