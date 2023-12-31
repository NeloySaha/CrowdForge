import axios from "axios";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

export const PendingCard = ({
  loggedUser,
  getMemData,
  pendingObj,
  failedToast,
  successToast,
  getPendingReqData,
}) => {
  const { contact_no, department, gender, name, email, dob, club, password } =
    pendingObj;

  const [appLoading, setAppLoading] = useState(false);
  const [rejLoading, setRejLoading] = useState(false);

  const formattedDate = new Date(dob).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const approveFunc = async () => {
    try {
      setAppLoading(true);
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

      const emailRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendEmail`,
        {
          email,
          msg: `🎉Congratulations from ${club} family! ${name}, your join request is approved.🎉`,
        }
      );

      successToast(emailRes.data);
    } catch (err) {
      console.log(err);

      failedToast(err.response.data);
    } finally {
      setAppLoading(false);
      getPendingReqData();
      getMemData();
    }
  };

  const rejectFunc = async () => {
    try {
      setRejLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hrRejectReq`,
        {
          email,
          club,
        }
      );

      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setRejLoading(false);
      getPendingReqData();
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
            {!appLoading ? (
              "Approve"
            ) : (
              <ScaleLoader color="#fff" size={7} height={16} />
            )}
          </button>

          <button className="eventbtn parbtn" onClick={rejectFunc}>
            {!rejLoading ? (
              "Reject"
            ) : (
              <ScaleLoader color="#fff" size={7} height={16} />
            )}
          </button>
        </div>
      </ul>
    </div>
  );
};
