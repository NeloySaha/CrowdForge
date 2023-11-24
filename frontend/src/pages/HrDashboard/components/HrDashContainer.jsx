import React from "react";
import { DetailsSection } from "../../../components/DetailsSection";
import { HrMiddleSection } from "./HrMiddleSection";
import { HrLastSection } from "./HrLastSection";

export const HrDashContainer = (props) => {
  return (
    <div className="hr-dashboard-container">
      <DetailsSection {...props} />
      <HrMiddleSection {...props} />
      <HrLastSection {...props} />
    </div>
  );
};
