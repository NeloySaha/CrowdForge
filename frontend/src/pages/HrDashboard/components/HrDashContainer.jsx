import React from "react";
import { DetailsSection } from "../../../components/DetailsSection";

export const HrDashContainer = (props) => {
  return (
    <div className="mem-dashboard-container">
      <DetailsSection {...props} />
    </div>
  );
};
