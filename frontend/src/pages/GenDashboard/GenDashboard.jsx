import React from "react";

import { MemDashboardSection } from "./components/MemDashboardSection";

const GenDashboard = (props) => {
  return (
    <div>
      <MemDashboardSection {...props} />
    </div>
  );
};
export default GenDashboard;
