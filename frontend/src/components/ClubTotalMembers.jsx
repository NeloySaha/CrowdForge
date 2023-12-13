import React, { useEffect } from "react";

export const ClubTotalMembers = ({ memData, getMemData }) => {
  useEffect(() => {
    getMemData();
  }, []);

  return (
    <section className="mem-count-section-container">
      <h1 className="section-heading">Club Details</h1>
      <div className="total-gen-card">
        <h1 className="gen-card-stat">{memData}</h1>
        <p className="gen-card-title">Total Members</p>
      </div>
    </section>
  );
};
