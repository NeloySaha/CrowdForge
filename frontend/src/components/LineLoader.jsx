import React from "react";
import { PropagateLoader } from "react-spinners";

export const LineLoader = () => {
  return (
    <div className="line-loading-container">
      <PropagateLoader color="#89CFF0" />
    </div>
  );
};
