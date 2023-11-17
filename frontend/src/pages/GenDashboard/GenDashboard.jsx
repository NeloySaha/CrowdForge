import React from "react";

import { MemDashboardSection } from "./components/MemDashboardSection";

export const GenDashboard = (props) => {
  return (
    <div>
      <MemDashboardSection {...props} />
    </div>
  );
};
