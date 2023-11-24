import { useLocation } from "react-router-dom";

export const Navbar = ({ setLoggedUser }) => {
  let userType;
  const location = useLocation();

  if (location.pathname === "/genDashboard") {
    userType = "Member";
  } else if (location.pathname === "/humanResource") {
    userType = "HR";
  } else if (location.pathname === "/president") {
    userType = "President";
  }

  return (
    <nav
      style={{
        display: location.pathname === "/" ? "none" : "",
      }}
    >
      <div>
        <h1 className="nav-heading">{userType} Dashboard</h1>
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
