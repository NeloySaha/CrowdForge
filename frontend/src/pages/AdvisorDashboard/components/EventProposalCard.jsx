import { LiaBuilding, LiaCalendar } from "react-icons/lia";
import { IoPeopleOutline, IoBan } from "react-icons/io5";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

export const EventProposalCard = ({
  capacity,
  club_name,
  cost,
  date,
  event_id,
  money_received,
  name,
  venue,
  restriction,
  loggedUser,
  successToast,
  failedToast,
  getEventData,
}) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const [appLoading, setAppLoading] = useState(false);
  const [rejLoading, setRejLoading] = useState(false);

  const approveEvent = async () => {
    try {
      setAppLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/approveEventReq`,
        {
          name,
          cost: +cost,
          date,
          capacity: +capacity,
          venue,
          club_name,
          restriction: +restriction,
          event_id,
          money_received: 0,
        }
      );

      console.log(res.data);
      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setAppLoading(false);
      getEventData();
    }
  };

  const rejectEvent = async () => {
    try {
      setRejLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/rejectEventReq`,
        {
          event_id,
        }
      );

      console.log(res.data);
      successToast(res.data);
    } catch (err) {
      console.log(err);
      failedToast(err.response.data);
    } finally {
      setRejLoading(false);
      getEventData();
    }
  };
  return (
    <div className="detail-event-box">
      <p className="det-event-heading">{name}</p>

      <div className="det-event-detail-grid">
        <ul className="det-event-categories">
          <li className="det-event-venue">
            <LiaBuilding size="1.8rem" color="#0052c3" />
            <p>{venue}</p>
          </li>

          <li className="det-event-capacity">
            <IoPeopleOutline size="1.8rem" color="#0052c3" />
            <p>{capacity} persons</p>
          </li>

          <li className="det-event-date">
            <LiaCalendar size="1.8rem" color="#0052c3" />
            <p>{formattedDate}</p>
          </li>

          <li className="det-event-restriction">
            <IoBan size="1.8rem" color="#0052c3" />
            <p>
              {restriction === 1 ? "Restricted Event" : "Unrestricted Event"}
            </p>
          </li>
        </ul>

        <div className="progress-container">
          <div
            className="circular-progress-bar"
            style={{
              background: `conic-gradient(#007aff ${0 * 3.6}deg, #ededed 0deg)`,
            }}
          >
            <div className="progress-info">
              <div className="progress-category">
                <FaBangladeshiTakaSign size="1.4rem" color="#0052c3" />
                <p>
                  <span>0</span>/{cost}
                </p>
              </div>
            </div>
          </div>

          <div className="progress-category">
            <FaBangladeshiTakaSign size="1.4rem" color="#0052c3" />
            <p>Received/Total Cost</p>
          </div>
        </div>
      </div>

      <div className="det-event-btn-container">
        <button className="eventbtn volbtn" onClick={approveEvent}>
          {!appLoading ? "Approve" : <ScaleLoader color="#fff" height={10} />}
        </button>

        <button className="eventbtn parbtn" onClick={rejectEvent}>
          {!rejLoading ? "Reject" : <ScaleLoader color="#fff" height={10} />}
        </button>
      </div>
    </div>
  );
};
