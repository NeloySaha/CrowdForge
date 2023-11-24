import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoMaleSharp,
  IoFemaleSharp,
  IoMaleFemaleSharp,
} from "react-icons/io5";

export const EditUserInfo = ({
  failedToast,
  successToast,
  loggedUser,
  setLoggedUser,
}) => {
  const [editInfo, setEditInfo] = useState({
    name: "",
    gender: "",
    department: "",
    contact_no: "",
    oldPass: "",
    password: "",
    dob: "",
    email: loggedUser.email,
    club: loggedUser.club,
  });
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [deptDataHtml, setDeptDataHtml] = useState([]);
  const [editDisabled, setEditDisabled] = useState(true);

  const radioCheckedColor = (col) => ({
    backgroundColor: col === editInfo.gender ? "#dbeafd" : "",
    border: col === editInfo.gender ? "1px solid transparent" : "",
  });

  const handleEdit = (e) => {
    setEditInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      setEditInfo((prev) => ({ ...prev, department: res.data[0].name }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDeptData();
  }, []);

  useEffect(() => {
    console.log(editInfo);
    if (
      editInfo.oldPass.length !== 0 &&
      editInfo.password.length !== 0 &&
      editInfo.name.length !== 0 &&
      editInfo.dob.length !== 0 &&
      editInfo.gender.length !== 0 &&
      editInfo.contact_no.length !== 0 &&
      editInfo.department.length !== 0
    ) {
      setEditDisabled(false);
    } else {
      setEditDisabled(true);
    }
  }, [editInfo]);

  const submitEdit = async () => {
    if (editInfo.oldPass !== loggedUser.password) {
      failedToast("Your current password is incorrect!");
      return;
    }

    try {
      const res1 = await axios.post(
        `${import.meta.env.VITE_API_URL}/editProfile`,
        editInfo
      );

      if (res1.status === 200) {
        successToast(res1.data, 6000);
        const res2 = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          clubName: loggedUser.club,
          email: loggedUser.email,
          password: editInfo.password,
        });

        setLoggedUser(res2.data[0]);
      }
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setEditInfo({
        name: "",
        gender: "",
        department: "",
        contact_no: "",
        oldPass: "",
        password: "",
        dob: "",
        email: loggedUser.email,
        club: loggedUser.club,
      });

      getDeptData();
    }
  };

  return (
    <form
      className="edit-profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitEdit();
      }}
    >
      <div className="auth-form--category">
        <p>
          Your Department:<span>*</span>
        </p>
        <select
          name="department"
          onChange={handleEdit}
          value={editInfo.department}
        >
          {deptDataHtml}
        </select>
      </div>

      <div className="auth-form--category">
        <p>
          Your Name:<span>*</span>
        </p>
        <input
          type="text"
          name="name"
          value={editInfo.name}
          placeholder="Enter Full Name"
          onChange={handleEdit}
          required
        />
      </div>

      <div className="auth-form--category">
        <p>
          Your Date of Birth:<span>*</span>
        </p>
        <input
          type="date"
          name="dob"
          placeholder="Enter Birth Date"
          value={editInfo.dob}
          onChange={handleEdit}
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
              onChange={handleEdit}
              checked={"Male" === editInfo.gender}
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
              onChange={handleEdit}
              checked={"Female" === editInfo.gender}
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
              onChange={handleEdit}
              checked={"Others" === editInfo.gender}
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
          Phone Number:<span>*</span>
        </p>
        <input
          type="number"
          name="contact_no"
          value={editInfo.contact_no}
          placeholder="Enter Phone Number"
          onChange={handleEdit}
          required
        />
      </div>

      <div className="auth-form--category">
        <p>
          Current Password:<span>*</span>
        </p>
        <div className="pass-input-container">
          <input
            type={!showOldPass ? "password" : "text"}
            name="oldPass"
            value={editInfo.oldPass}
            placeholder="Enter Current Password"
            onChange={handleEdit}
            required
          />
          <button
            type="button"
            className="pass-icon-btn"
            onClick={() => setShowOldPass((prev) => !prev)}
          >
            {!showOldPass ? (
              <IoEyeOffOutline size="2rem" color="#0052c3" />
            ) : (
              <IoEyeOutline size="2rem" color="#0052c3" />
            )}
          </button>
        </div>
      </div>

      <div className="auth-form--category">
        <p>
          New Password:<span>*</span>
        </p>
        <div className="pass-input-container">
          <input
            type={!showNewPass ? "password" : "text"}
            name="password"
            value={editInfo.password}
            placeholder="Enter New Password"
            onChange={handleEdit}
            required
          />
          <button
            type="button"
            className="pass-icon-btn"
            onClick={() => setShowNewPass((prev) => !prev)}
          >
            {!showNewPass ? (
              <IoEyeOffOutline size="2rem" color="#0052c3" />
            ) : (
              <IoEyeOutline size="2rem" color="#0052c3" />
            )}
          </button>
        </div>
      </div>

      <button
        disabled={editDisabled}
        className={editDisabled ? "login-btn-disabled" : "login-btn"}
      >
        Confirm
      </button>
    </form>
  );
};
