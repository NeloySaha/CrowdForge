import axios from "axios";
import { useEffect, useState } from "react";

export const TreasurerLastSection = ({ loggedUser }) => {
  const { club } = loggedUser;

  const [memData, setMemData] = useState(0);
  const [volunteerData, setVolunteerData] = useState([]);

  const getMemData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubMemberCount/${club}`
      );

      setMemData(res.data[0].totalCount);
    } catch (err) {
      console.log(err);
    }
  };

  const getVolunData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/eventWiseVol/${club}`
      );

      setVolunteerData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const volunCards = volunteerData.map((volunObj, idx) => {
    return (
      <div key={idx} className="total-gen-card">
        <h1 className="gen-card-stat">{volunObj.totalCount}</h1>
        <p className="gen-card-title">{volunObj.name}</p>
      </div>
    );
  });
  useEffect(() => {
    getMemData();
    getVolunData();
  }, []);

  return (
    <section className="hr-last-section">
      <h1 className="section-heading">Club Details</h1>
      <div className="total-gen-card">
        <h1 className="gen-card-stat">{memData}</h1>
        <p className="gen-card-title">Total Members</p>
      </div>

      {volunCards.length > 0 && (
        <h1 className="section-heading gen-card-heading">Volunteers</h1>
      )}
      {volunCards}
    </section>
  );
};
