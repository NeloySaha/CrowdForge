import React, { useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

export const PromoCard = ({
  loggedUser,
  pendingObj,
  failedToast,
  successToast,
  getPendingReqData,
}) => {
  const { name, email, designation, promoted_designation } = pendingObj;
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejLoading, setRejLoading] = useState(false);

  const approveFunc = async () => {
    try {
      setAcceptLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/approvePromReq`,
        {
          promoted_designation,
          email,
          club: loggedUser.club,
        }
      );

      successToast(res.data);

      const emailRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendEmail`,
        {
          email,
          msg: `🎉Congratulations from ${
            loggedUser.club
          } family! ${name}, You have been promoted to ${promoted_designation.toUpperCase()} in ${
            loggedUser.club
          }🎉`,
        }
      );

      successToast(emailRes.data);
    } catch (err) {
      console.log(err);

      failedToast(err.response.data);
    } finally {
      setAcceptLoading(false);
      getPendingReqData();
    }
  };

  const rejectFunc = async () => {
    try {
      setRejLoading(true);
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
          <p className="category ">Current Designation:</p>
          <p className="detail-val upper">{designation}</p>
        </li>

        <li>
          <p className="category">Promoted Designation:</p>
          <p className="detail-val upper">{promoted_designation}</p>
        </li>

        <div className="pending-btn-container">
          <button className="eventbtn volbtn" onClick={approveFunc}>
            {!acceptLoading ? (
              "Approve"
            ) : (
              <ScaleLoader color="#fff" height={10} />
            )}
          </button>

          <button className="eventbtn parbtn" onClick={rejectFunc}>
            {!rejLoading ? "Reject" : <ScaleLoader color="#fff" height={10} />}
          </button>
        </div>
      </ul>
    </div>
  );
};
