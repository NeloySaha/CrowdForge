import React from "react";
import { DetailsSection } from "../../../components/DetailsSection";
import { PreMiddleSection } from "./PreMiddleSection";
import { ClubDetail } from "../../../components/ClubDetail";
import { ClubTotalMembers } from "../../../components/ClubTotalMembers";

export const PreDashSection = (props) => {
  return (
    <div className="pre-dash-container">
      <ClubTotalMembers {...props} />
      <ClubDetail {...props} />
      <DetailsSection {...props} />
      <PreMiddleSection {...props} />
    </div>
  );
};
