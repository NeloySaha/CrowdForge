import { useEffect, useState } from "react";
import axios from "axios";
import { LiaBuilding, LiaCalendar } from "react-icons/lia";
import { Link } from "react-router-dom";
import { SectionLoader } from "../../../components/SectionLoader";

export const OtherClubs = ({ loggedUser }) => {
  const { club } = loggedUser;
  const [otherClubs, setOtherClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOtherClubData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/otherClubDetails/${club}`
      );

      setOtherClubs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const otherClubsHtml = otherClubs?.map((clubObj, idx) => {
    const formattedDate = new Date(clubObj.established_date).toLocaleString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

    return (
      <div key={idx} className="club-box">
        <h1 className="club-name">
          {clubObj.full_form} <span>({clubObj.name})</span>
        </h1>

        <p className="club-details">{clubObj.description}</p>

        <div className="club-box-mini-cont">
          <div className="club-category">
            <LiaBuilding size="1.8rem" color="#0052c3" />
            <p>{clubObj.location}</p>
          </div>
          <div className="club-category">
            <LiaCalendar size="1.8rem" color="#0052c3" />
            <p>Established at {formattedDate}</p>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    getOtherClubData();
  }, []);

  return (
    <div className="other-club-container">
      <h1 className="section-heading">Find Other Clubs,</h1>
      {loading ? (
        <SectionLoader />
      ) : (
        <div className="other-club-section">{otherClubsHtml}</div>
      )}
      <div className="other-club-bottom">
        <Link className="join-other-btn" to="/">
          Join Other Clubs&rarr;
        </Link>
      </div>
    </div>
  );
};
