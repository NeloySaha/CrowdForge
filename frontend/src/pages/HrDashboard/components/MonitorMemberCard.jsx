import { useState } from "react";
import axios from "axios";

export const MonitorMemberCard = ({
  name,
  gender,
  club,
  contact_no,
  designation,
  dob,
  email,
  department,
  rating,
  successToast,
  failedToast,
  getMemberData,
}) => {
  const [curRating, setCurRating] = useState(+rating);
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);

  const handlePlus = () => {
    setCurRating((prev) => (prev < 10 ? prev + 1 : prev));
    setShowConfirmBtn(true);
  };

  const handleMinus = () => {
    setCurRating((prev) => (prev > 0 ? prev - 1 : prev));
    setShowConfirmBtn(true);
  };

  const handleUpdateRating = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateRating`,
        {
          email,
          club,
          newRating: curRating,
        }
      );

      successToast(res.data);
      setShowConfirmBtn(false);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      getMemberData();
    }
  };

  const handleRemoveMember = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/removeMembers`,
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
      getMemberData();
    }
  };

  return (
    <div className="monitor-card">
      <ul className="monitor-card-categories">
        <li className="category">
          <p>{name}</p>
        </li>

        <li className="category">
          <p>{department}</p>
        </li>

        <li className="category">
          <p>{contact_no}</p>
        </li>

        <li className="category rating-grid">
          <div className="rating-control">
            <button className="rating-minus" onClick={handleMinus}>
              -
            </button>
            <p>{curRating}</p>
            <button className="rating-plus" onClick={handlePlus}>
              +
            </button>
          </div>
          <div>
            {showConfirmBtn && (
              <button className="confirm-btn" onClick={handleUpdateRating}>
                Confirm
              </button>
            )}
          </div>
        </li>

        <li>
          <button className="remove-btn" onClick={handleRemoveMember}>
            Remove
          </button>
        </li>
      </ul>
    </div>
  );
};
