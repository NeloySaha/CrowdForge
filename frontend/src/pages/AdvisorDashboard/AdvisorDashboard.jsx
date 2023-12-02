import React from "react";
import { DetailsSection } from "../../components/DetailsSection";
import { AdvisorMiddleSection } from "./components/AdvisorMiddleSection";
import { AdvisorLastSection } from "./components/AdvisorLastSection";

export const AdvisorDashboard = (props) => {
  return (
    <section className="advisor-dash-container">
      <DetailsSection {...props} />
      <AdvisorMiddleSection {...props} />
      <AdvisorLastSection {...props} />
    </section>
  );
};
