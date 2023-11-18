import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaBuilding, LiaCalendar } from "react-icons/lia";

export const OtherClubs = ({ loggedUser, setCurPage, setLoggedUser }) => {
  const { club } = loggedUser;
  const [otherClubs, setOtherClubs] = useState([]);

  const getOtherClubData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${club}`
      );

      setOtherClubs(res.data);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    console.log(otherClubs);
  }, [otherClubs]);

  return (
    <div className="other-club-container">
      <h1 className="section-heading">Find Other Clubs,</h1>
      <div className="other-club-section">{otherClubsHtml}</div>
      <div className="other-club-bottom">
        <button
          className="join-other-btn eventbtn"
          onClick={() => {
            setLoggedUser({});
            setCurPage("");
          }}
        >
          Join Other Clubs&rarr;
        </button>
      </div>
    </div>
  );
};
