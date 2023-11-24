import React from "react";
import { DetailsSection } from "../../../components/DetailsSection";
import { PreMiddleSection } from "./PreMiddleSection";

export const PreDashSection = (props) => {
  return (
    <div className="pre-dash-container">
      <DetailsSection {...props} />
      <PreMiddleSection {...props} />
    </div>
  );
};
