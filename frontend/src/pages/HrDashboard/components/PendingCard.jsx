import axios from "axios";
import React from "react";

export const PendingCard = ({
  loggedUser,
  pendingObj,
  failedToast,
  successToast,
  getPendingReqData,
}) => {
  const { contact_no, department, gender, name, email, dob, club, password } =
    pendingObj;

  const formattedDate = new Date(dob).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const approveFunc = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hrMemInsert`,
        {
          name,
          email,
          dob: dob.slice(0, 10),
          department,
          gender,
          club,
          password,
          contact_no,
          evaluation: null,
        }
      );

      successToast(res.data);
      getPendingReqData();
    } catch (err) {
      console.log(err);

      failedToast(err.response.data);
    }
  };

  const rejectFunc = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hrRejectReq`,
        {
          email,
          club,
        }
      );

      successToast(res.data);
      getPendingReqData();
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    }
  };

  return (
    <div className="pending-card">
      <ul className="info-container">
        <li>
          <p className="category">Name:</p>
          <p className="detail-val">{name}</p>
        </li>

        <li>
          <p className="category">Email:</p>
          <p className="detail-val">{email}</p>
        </li>

        <li>
          <p className="category">Date of Birth:</p>
          <p className="detail-val">{formattedDate}</p>
        </li>

        <li>
          <p className="category">Gender:</p>
          <p className="detail-val upper">{gender}</p>
        </li>

        <li>
          <p className="category">Department:</p>
          <p className="detail-val">{department}</p>
        </li>

        <li>
          <p className="category">Phone Number:</p>
          <p className="detail-val">{contact_no}</p>
        </li>

        <div className="pending-btn-container">
          <button className="eventbtn volbtn" onClick={approveFunc}>
            Approve
          </button>

          <button className="eventbtn parbtn" onClick={rejectFunc}>
            Reject
          </button>
        </div>
      </ul>
    </div>
  );
};
