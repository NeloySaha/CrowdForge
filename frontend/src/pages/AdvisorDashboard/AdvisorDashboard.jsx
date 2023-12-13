import React from "react";
import { DetailsSection } from "../../components/DetailsSection";
import { AdvisorMiddleSection } from "./components/AdvisorMiddleSection";
import { ClubDetail } from "../../components/ClubDetail";
import { ClubTotalMembers } from "../../components/ClubTotalMembers";

export const AdvisorDashboard = (props) => {
  return (
    <section className="advisor-dash-container">
      <ClubTotalMembers {...props} />
      <ClubDetail {...props} />
      <DetailsSection {...props} />
      <AdvisorMiddleSection {...props} />
    </section>
  );
};
