import { useState } from "react";
import axios from "axios";
import { IoAddOutline, IoChevronDownSharp, IoChevronUp } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";

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
  const [dropDown, setDropDown] = useState(false);
  const [promoted_designation, setPromotedDesignation] = useState("treasurer");

  const handleChange = (e) => {
    setPromotedDesignation(e.target.value);
  };

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

      const emailRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/sendEmail`,
        {
          email,
          msg: `${name}, You have been kicked out from ${club} due to unavoidable reasons.`,
        }
      );

      successToast(emailRes.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      getMemberData();
    }
  };

  const insertPromoteData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hrPromoReq`,
        {
          name,
          email,
          club,
          designation,
          promoted_designation,
        }
      );

      if (res.status === 200) {
        successToast("Promotion Request Sent!");
      }
    } catch (err) {
      console.log(err);
      failedToast("Sorry Request failed!");
    } finally {
      getMemberData();
    }
  };

  return (
    <div className="monitor-card">
      <div className="category">
        <p>{name}</p>
      </div>

      <div className="category">
        <p>{department}</p>
      </div>

      <div className="category">
        <p>{contact_no}</p>
      </div>

      <div className="category rating-grid">
        <div className="rating-control">
          <button className="rating-minus" onClick={handleMinus}>
            <FiMinus size="1.6rem" color="#fff" />
          </button>
          <p>{curRating}</p>
          <button className="rating-plus" onClick={handlePlus}>
            <IoAddOutline size="1.6rem" color="#fff" />
          </button>
        </div>

        <div>
          {showConfirmBtn && (
            <button className="confirm-btn" onClick={handleUpdateRating}>
              Confirm
            </button>
          )}
        </div>
      </div>

      <div className="category">
        <button
          className="dropbtn"
          onClick={() => setDropDown((prev) => !prev)}
        >
          {!dropDown && <IoChevronDownSharp size="2.4rem" color="#0052c3" />}
          {dropDown && <IoChevronUp size="2.4rem" color="#0052c3" />}
        </button>
      </div>

      {dropDown && (
        <div className="monitor-btn-container">
          <div className="monitor-selector">
            <select name="promoted_designation" onChange={handleChange}>
              <option value="treasurer">Treasurer</option>
              <option value="hr">HR</option>
            </select>
          </div>

          <button className="confirm-btn" onClick={insertPromoteData}>
            Promote
          </button>

          <button className="remove-btn" onClick={handleRemoveMember}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
