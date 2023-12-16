import React, { useEffect } from "react";
import { SectionLoader } from "./SectionLoader";

export const ClubTotalMembers = ({ memData, getMemData, memLoading }) => {
  useEffect(() => {
    getMemData();
  }, []);

  return (
    <section className="mem-count-section-container">
      <h1 className="section-heading">Club Details</h1>
      {memLoading ? (
        <SectionLoader />
      ) : (
        <div className="total-gen-card">
          <h1 className="gen-card-stat">{memData}</h1>
          <p className="gen-card-title">Total Members</p>
        </div>
      )}
    </section>
  );
};
