import React from "react";
import { DetailsSection } from "../../../components/DetailsSection";
import { PreMiddleSection } from "./PreMiddleSection";
import { ClubDetail } from "./ClubDetail";

export const PreDashSection = (props) => {
  return (
    <div className="pre-dash-container">
      <DetailsSection {...props} />
      <PreMiddleSection {...props} />
      <ClubDetail {...props} />
    </div>
  );
};
