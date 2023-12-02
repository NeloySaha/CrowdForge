import React from "react";
import axios from "axios";

export const PromoCard = ({
  loggedUser,
  pendingObj,
  failedToast,
  successToast,
  getPendingReqData,
}) => {
  const { name, email, designation, promoted_designation } = pendingObj;

  const approveFunc = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/approvePromReq`,
        {
          promoted_designation,
          email,
          club: loggedUser.club,
        }
      );

      successToast(res.data);
    } catch (err) {
      console.log(err);

      // failedToast(err.response.data);
    } finally {
      getPendingReqData();
    }
  };

  const rejectFunc = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rejectPromReq`,
        {
          email,
          club: loggedUser.club,
        }
      );

      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
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
          <p className="category ">Current Designation:</p>
          <p className="detail-val upper">{designation}</p>
        </li>

        <li>
          <p className="category">Promoted Designation:</p>
          <p className="detail-val upper">{promoted_designation}</p>
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
