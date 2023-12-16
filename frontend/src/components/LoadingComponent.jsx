import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

export const LoadingComponent = () => {
  return (
    <div className="loader-container">
      <ClimbingBoxLoader color="#89CFF0" size={30} />
    </div>
  );
};
