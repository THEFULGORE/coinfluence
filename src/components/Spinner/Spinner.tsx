import React from "react";
import "./Spinner.scss";
export const Spinner = () => {
  return (
    <div className="spinner-container">
      <svg
        id="loading-spinner"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="loading-circle-meduim"
          cx="40"
          cy="40"
          r="36"
          stroke="#ffd700"
          stroke-width="8"
        />
      </svg>
    </div>
  );
};
