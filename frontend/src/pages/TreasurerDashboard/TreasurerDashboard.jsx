import React from "react";
import { DetailsSection } from "../../components/DetailsSection";
import { TreasurerMiddleSection } from "./components/TreasurerMiddleSection";
import { TreasurerLastSection } from "./components/TreasurerLastSection";

export const TreasurerDashboard = (props) => {
  return (
    <section className="treasurer-dash-container">
      <DetailsSection {...props} />
      <TreasurerMiddleSection {...props} />
      <TreasurerLastSection {...props} />
    </section>
  );
};
