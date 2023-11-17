import React from "react";

export const Navbar = ({ setLoggedUser, setCurPage, curPage }) => {
  let userType;

  if (curPage === "general") {
    userType = "Member";
  } else if (curPage === "hr") {
    userType = "HR";
  }

  return (
    <nav>
      <div>
        <h1 className="nav-heading">{userType} Dashboard</h1>
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          setLoggedUser({});
          setCurPage("");
        }}
      >
        Log Out
      </button>
    </nav>
  );
};
