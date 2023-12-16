import React from "react";
import { RotateLoader } from "react-spinners";

export const SectionLoader = () => {
  return (
    <div className="section-loading-container">
      <RotateLoader color="#89CFF0" />
    </div>
  );
};
