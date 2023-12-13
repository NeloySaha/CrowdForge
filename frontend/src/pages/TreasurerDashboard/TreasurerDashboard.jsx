import React from "react";
import { DetailsSection } from "../../components/DetailsSection";
import { TreasurerMiddleSection } from "./components/TreasurerMiddleSection";
import { ClubDetail } from "../../components/ClubDetail";
import { ClubTotalMembers } from "../../components/ClubTotalMembers";

export const TreasurerDashboard = (props) => {
  return (
    <section className="treasurer-dash-container">
      <ClubTotalMembers {...props} />
      <ClubDetail {...props} />
      <DetailsSection {...props} />
      <TreasurerMiddleSection {...props} />
    </section>
  );
};
