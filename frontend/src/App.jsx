import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

import { AuthPage } from "./pages/Authentication/AuthPage";
import { GenDashboard } from "./pages/GenDashboard/GenDashboard";
import { HrDashboard } from "./pages/HrDashboard/HrDashboard";
import { Navbar } from "./components/Navbar";
// niaz er eita 3rd commit
function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );

  const toastPrimaryCategories = {
    position: "bottom-center",
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  };
  const toastFontStyle = {
    fontFamily: "Raleway",
    fontSize: "1.2rem",
    fontWeight: 600,
    letterSpacing: "0.75px",
    color: "#1a1d2c",
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(loggedUser));
  }, [loggedUser]);

  const failedToast = (msg, time = 3000) => {
    toast.error(msg, {
      ...toastPrimaryCategories,
      autoClose: time,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const successToast = (msg, time = 3000) => {
    toast.success(msg, {
      ...toastPrimaryCategories,
      autoClose: time,
      theme: "colored",
      style: toastFontStyle,
    });
  };

  const props = {
    loggedUser,
    setLoggedUser,
    failedToast,
    successToast,
  };

  console.log("Branch e uthe naki test kortesi");

  return (
    <>
      <ToastContainer />
      <Navbar {...props} />
      <Routes>
        <Route path="/" element={<AuthPage {...props} />} />
        <Route
          element={
            <ProtectedRoute
              condition={
                Object.keys(loggedUser).length !== 0 &&
                loggedUser.designation === "general"
              }
            />
          }
        >
          <Route path="/genDashboard" element={<GenDashboard {...props} />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              condition={
                Object.keys(loggedUser).length !== 0 &&
                loggedUser.designation === "hr"
              }
            />
          }
        >
          <Route path="/humanResource" element={<HrDashboard {...props} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
