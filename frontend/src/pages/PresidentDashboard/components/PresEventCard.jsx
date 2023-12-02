import { LiaBuilding, LiaCalendar } from "react-icons/lia";
import { IoPeopleOutline, IoBan } from "react-icons/io5";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export const PresEventCard = ({
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
}) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
              background: `conic-gradient(#007aff ${
                ((100 * money_received) / cost) * 3.6
              }deg, #ededed 0deg)`,
            }}
          >
            <div className="progress-info">
              <div className="progress-category">
                <FaBangladeshiTakaSign size="1.4rem" color="#0052c3" />
                <p>
                  <span> {money_received}</span>/{cost}
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
    </div>
  );
};
