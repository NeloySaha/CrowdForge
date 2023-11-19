import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoMaleSharp,
  IoFemaleSharp,
  IoMaleFemaleSharp,
} from "react-icons/io5";

export const Registration = ({ failedToast, successToast }) => {
  const [regInfo, setRegInfo] = useState({
    clubName: "",
    name: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    designation: "Member",
    contactNo: "",
    dept: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [clubDataHtml, setClubDataHtml] = useState([]);
  const [deptDataHtml, setDeptDataHtml] = useState([]);
  const [regDisabled, setRegDisabled] = useState(true);

  const radioCheckedColor = (col) => ({
    backgroundColor: col === regInfo.gender ? "#dbeafd" : "",
    border: col === regInfo.gender ? "1px solid transparent" : "",
  });

  const handleRegInfo = (e) => {
    setRegInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getDeptData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/depts`);

      const deptOptions = res.data?.map((deptObj, id) => (
        <option key={id} value={deptObj.name}>
          {deptObj.name}
        </option>
      ));

      setDeptDataHtml(deptOptions);
      setRegInfo((prev) => ({ ...prev, dept: res.data[0].name }));
    } catch (err) {
      console.log(err);
    }
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
      setRegInfo((prev) => ({ ...prev, clubName: res.data[0].name }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getClubData();
    getDeptData();
  }, []);

  useEffect(() => {
    if (
      regInfo.email.length !== 0 &&
      regInfo.password.length !== 0 &&
      regInfo.name.length !== 0 &&
      regInfo.dateOfBirth.length !== 0 &&
      regInfo.gender.length !== 0 &&
      regInfo.contactNo.length !== 0
    ) {
      setRegDisabled(false);
    } else {
      setRegDisabled(true);
    }
  }, [regInfo]);

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        regInfo
      );

      if (res.status === 200) {
        successToast(res.data, 6000);
      }
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setRegInfo({
        clubName: "",
        name: "",
        email: "",
        password: "",
        gender: "",
        dateOfBirth: "",
        designation: "Member",
        contactNo: "",
        dept: "",
      });

      getClubData();
      getDeptData();
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      <div className="auth-form--category">
        <p>
          Choose your club:<span>*</span>
        </p>
        <select
          name="clubName"
          onChange={handleRegInfo}
          value={regInfo.clubName}
        >
          {clubDataHtml}
        </select>
      </div>

      <div className="auth-form--category">
        <p>
          Your Department:<span>*</span>
        </p>
        <select name="dept" onChange={handleRegInfo} value={regInfo.dept}>
          {deptDataHtml}
        </select>
      </div>

      <div className="auth-form--category">
        <p>
          Name: <span>*</span>
        </p>
        <input
          type="text"
          name="name"
          value={regInfo.name}
          placeholder="Enter Full Name"
          onChange={handleRegInfo}
          required
        />
      </div>

      <div className="auth-form--category">
        <p>
          Date of Birth: <span>*</span>
        </p>
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Enter Birth Date"
          value={regInfo.dateOfBirth}
          onChange={handleRegInfo}
          required
        />
      </div>

      <div className="auth-form--category">
        <p>
          Select Gender:<span>*</span>
        </p>
        <div className="auth-radio-options">
          <div
            className="auth-radio-container"
            key="Male"
            style={radioCheckedColor("Male")}
          >
            <input
              type="radio"
              id={1}
              name="gender"
              value="Male"
              onChange={handleRegInfo}
              checked={"Male" === regInfo.gender}
            />

            <label htmlFor={"Male"}>
              <IoMaleSharp size="1.4rem" color="#0052c3" />
              Male
            </label>
          </div>

          <div
            className="auth-radio-container"
            key="Female"
            style={radioCheckedColor("Female")}
          >
            <input
              type="radio"
              id={2}
              name="gender"
              value="Female"
              onChange={handleRegInfo}
              checked={"Female" === regInfo.gender}
            />

            <label htmlFor={"Female"}>
              <IoFemaleSharp size="1.4rem" color="#0052c3" />
              Female
            </label>
          </div>

          <div
            className="auth-radio-container"
            key="Others"
            style={radioCheckedColor("Others")}
          >
            <input
              type="radio"
              id={3}
              name="gender"
              value="Others"
              onChange={handleRegInfo}
              checked={"Others" === regInfo.gender}
            />

            <label htmlFor={"Others"}>
              <IoMaleFemaleSharp size="1.4rem" color="#0052c3" />
              Others
            </label>
          </div>
        </div>
      </div>

      <div className="auth-form--category">
        <p>
          Phone Number: <span>*</span>
        </p>
        <input
          type="number"
          name="contactNo"
          value={regInfo.contactNo}
          placeholder="Enter Phone Number"
          onChange={handleRegInfo}
          required
        />
      </div>

      <div className="auth-form--category">
        <p>
          Email: <span>*</span>
        </p>
        <input
          type="email"
          name="email"
          value={regInfo.email}
          placeholder="Enter Email"
          onChange={handleRegInfo}
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
            value={regInfo.password}
            placeholder="Enter Password"
            onChange={handleRegInfo}
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
        disabled={regDisabled}
        className={regDisabled ? "login-btn-disabled" : "login-btn"}
      >
        Join Club
      </button>
    </form>
  );
};
