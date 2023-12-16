import React from "react";
import { PreDashSection } from "./components/PreDashSection";

const PreDashboard = (props) => {
  return (
    <section>
      <PreDashSection {...props} />
    </section>
  );
};

export default PreDashboard;
