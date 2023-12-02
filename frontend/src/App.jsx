import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

import { Navbar } from "./components/Navbar";
import { AuthPage } from "./pages/Authentication/AuthPage";
import { GenDashboard } from "./pages/GenDashboard/GenDashboard";
import { HrDashboard } from "./pages/HrDashboard/HrDashboard";
import { PreDashboard } from "./pages/PresidentDashboard/PreDashboard";
import { AdvisorDashboard } from "./pages/AdvisorDashboard/AdvisorDashboard";
import { FundModal } from "./modals/FundModal";
import { TreasurerDashboard } from "./pages/TreasurerDashboard/TreasurerDashboard";

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
    fontFamily: "Inter",
    fontSize: "1.2rem",
    fontWeight: 500,
    letterSpacing: "0.75px",
    color: "#333",
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

  return (
    <section>
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

        <Route
          element={
            <ProtectedRoute
              condition={
                Object.keys(loggedUser).length !== 0 &&
                loggedUser.designation === "president"
              }
            />
          }
        >
          <Route path="/president" element={<PreDashboard {...props} />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              condition={
                Object.keys(loggedUser).length !== 0 &&
                loggedUser.designation === "advisor"
              }
            />
          }
        >
          <Route path="/advisor" element={<AdvisorDashboard {...props} />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              condition={
                Object.keys(loggedUser).length !== 0 &&
                loggedUser.designation === "treasurer"
              }
            />
          }
        >
          <Route
            path="/treasurer"
            element={<TreasurerDashboard {...props} />}
          />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
