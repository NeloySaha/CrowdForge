import { useState } from "react";
import axios from "axios";
import { IoAddOutline, IoChevronDownSharp, IoChevronUp } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";

export const PreMonitorCard = ({
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
  getAllData,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const [promoted_designation, setPromotedDesignation] = useState("executive");

  const handleChange = (e) => {
    setPromotedDesignation(e.target.value);
  };

  const promoteMember = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/presidentPromote`,
        {
          promoted_designation,
          email,
          club,
        }
      );
      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      getAllData();
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

      console.log(res.data);
      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      getAllData();
    }
  };

  return (
    <div className="monitor-card">
      <div className="category">
        <p>{name}</p>
      </div>

      <div className="category category-designation">
        <p>{designation}</p>
      </div>

      <div className="category">
        <p>{contact_no}</p>
      </div>

      <div className="category">
        <p>{rating}</p>
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
              <option value="executive">Executive</option>

              <option value="hr">HR</option>
              <option value="treasurer">Treasurer</option>
            </select>
          </div>

          <button className="confirm-btn" onClick={promoteMember}>
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
