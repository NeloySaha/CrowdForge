import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import axios from "axios";
import { useState, useEffect, lazy, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

import { Navbar } from "./components/Navbar";
import { AuthPage } from "./pages/Authentication/AuthPage";
import { LoadingComponent } from "./components/LoadingComponent";

const GenDashboard = lazy(() => import("./pages/GenDashboard/GenDashboard"));
const HrDashboard = lazy(() => import("./pages/HrDashboard/HrDashboard"));
const PreDashboard = lazy(() =>
  import("./pages/PresidentDashboard/PreDashboard")
);
const AdvisorDashboard = lazy(() =>
  import("./pages/AdvisorDashboard/AdvisorDashboard")
);
const TreasurerDashboard = lazy(() =>
  import("./pages/TreasurerDashboard/TreasurerDashboard")
);

function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const [memLoading, setMemLoading] = useState(true);
  const [volLoading, setVolLoading] = useState(true);

  // For club details section
  const [memData, setMemData] = useState(0);
  const [volunteerData, setVolunteerData] = useState([]);

  const getMemData = async () => {
    try {
      setMemLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubMemberCount/${loggedUser.club}`
      );

      setMemData(res.data[0].totalCount);
    } catch (err) {
      console.log(err);
    } finally {
      setMemLoading(false);
    }
  };

  const getVolunData = async () => {
    try {
      setVolLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/eventWiseVol/${loggedUser.club}`
      );

      console.log(res.data);
      setVolunteerData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setVolLoading(false);
    }
  };

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
    memData,
    volunteerData,
    getMemData,
    getVolunData,
    memLoading,
    volLoading,
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
          <Route
            path="/genDashboard"
            element={
              <Suspense fallback={<LoadingComponent />}>
                <GenDashboard {...props} />
              </Suspense>
            }
          />
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
          <Route
            path="/humanResource"
            element={
              <Suspense fallback={<LoadingComponent />}>
                <HrDashboard {...props} />
              </Suspense>
            }
          />
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
          <Route
            path="/president"
            element={
              <Suspense fallback={<LoadingComponent />}>
                <PreDashboard {...props} />{" "}
              </Suspense>
            }
          />
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
          <Route
            path="/advisor"
            element={
              <Suspense fallback={<LoadingComponent />}>
                <AdvisorDashboard {...props} />
              </Suspense>
            }
          />
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
            element={
              <Suspense fallback={<LoadingComponent />}>
                <TreasurerDashboard {...props} />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
