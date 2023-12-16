import { useEffect } from "react";
import { SectionLoader } from "./SectionLoader";

export const ClubDetail = ({ volunteerData, volLoading, getVolunData }) => {
  const volunCards = volunteerData.map((volunObj, idx) => {
    return (
      <div key={idx} className="total-gen-card">
        <h1 className="gen-card-stat">{volunObj.totalCount}</h1>
        <p className="gen-card-title">{volunObj.name}</p>
      </div>
    );
  });

  useEffect(() => {
    getVolunData();
  }, []);

  return (
    <section className="vol-count-section-container">
      {volunCards.length > 0 && (
        <h1 className="section-heading gen-card-heading">Volunteers</h1>
      )}
      {volLoading ? (
        <SectionLoader />
      ) : (
        <div className="vol-info-card-container"> {volunCards}</div>
      )}
    </section>
  );
};
