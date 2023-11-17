import React, { useEffect, useState } from "react";
import axios from "axios";

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
    return (
      <div key={idx} className="club-box">
        <h1>{clubObj.name}</h1>
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
      <div className="other-club-section">{otherClubsHtml}</div>
      <button
        className="logout-btn"
        onClick={() => {
          setLoggedUser({});
          setCurPage("");
        }}
      >
        Join Other Clubs
      </button>
    </div>
  );
};
