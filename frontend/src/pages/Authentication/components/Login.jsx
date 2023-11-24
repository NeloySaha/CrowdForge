import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const Login = ({ setLoggedUser, failedToast, successToast }) => {
  const [showPass, setShowPass] = useState(false);
  const [clubDataHtml, setClubDataHtml] = useState([]);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    clubName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLoginInfo = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getClubData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs`);

      const clubOptions = res.data?.map((clubObj, id) => (
        <option key={id} value={clubObj.name}>
          {clubObj.name}
        </option>
      ));

      setClubDataHtml(clubOptions);

      setLoginInfo((prev) => ({ ...prev, clubName: res.data[0].name }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClubData();
  }, []);

  useEffect(() => {
    if (loginInfo.email.length !== 0 && loginInfo.password.length !== 0) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  }, [loginInfo]);

  // Log in
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        loginInfo
      );

      setLoggedUser(res.data[0]);

      setLoginInfo({
        clubName: "",
        email: "",
        password: "",
      });

      if (res.data[0].designation === "general") {
        navigate("/genDashboard");
      } else if (res.data[0].designation === "hr") {
        navigate("/humanResource");
      } else if (res.data[0].designation === "president") {
        navigate("/president");
      }

      successToast(`🎉Welcome, ${res.data[0].name}!`);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setLoginInfo({
        clubName: "",
        email: "",
        password: "",
      });

      getClubData();
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="auth-form--category">
        <p>
          Select your club:<span>*</span>
        </p>
        <select
          name="clubName"
          onChange={handleLoginInfo}
          value={loginInfo.clubName}
        >
          {clubDataHtml}
        </select>
      </div>

      <div className="auth-form--category">
        <p>
          Email: <span>*</span>
        </p>
        <input
          type="email"
          name="email"
          value={loginInfo.email}
          placeholder="Enter Email"
          onChange={handleLoginInfo}
          required
        />
      </div>

      <div className="auth-form--category">
        <p>
          Password: <span>*</span>
        </p>
        <div className="pass-input-container">
          <input
            type={!showPass ? "password" : "text"}
            name="password"
            value={loginInfo.password}
            placeholder="Enter Password"
            onChange={handleLoginInfo}
            required
          />
          <button
            type="button"
            className="pass-icon-btn"
            onClick={() => setShowPass((prev) => !prev)}
          >
            {!showPass ? (
              <IoEyeOffOutline size="2rem" color="#0052c3" />
            ) : (
              <IoEyeOutline size="2rem" color="#0052c3" />
            )}
          </button>
        </div>
      </div>

      <button
        disabled={loginDisabled}
        className={loginDisabled ? "login-btn-disabled" : "login-btn"}
      >
        Login
      </button>
    </form>
  );
};
