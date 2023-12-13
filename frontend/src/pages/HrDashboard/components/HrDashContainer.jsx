import React from "react";
import { DetailsSection } from "../../../components/DetailsSection";
import { HrMiddleSection } from "./HrMiddleSection";
import { ClubDetail } from "../../../components/ClubDetail";
import { ClubTotalMembers } from "../../../components/ClubTotalMembers";

export const HrDashContainer = (props) => {
  return (
    <div className="hr-dashboard-container">
      <ClubTotalMembers {...props} />
      <ClubDetail {...props} />
      <DetailsSection {...props} />
      <HrMiddleSection {...props} />
    </div>
  );
};
