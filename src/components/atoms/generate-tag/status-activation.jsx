import React from "react";
import { statusActivation } from "../../../helpers/status-data";

const StatusActivationTag = ({ text }) => {
  return (
    <section
      className={`py-1 px-3 rounded-lg  ${
        text === statusActivation.active.value
          ? "bg-green-100 border border-green-700"
          : "bg-red-100 border border-red-700"
      }`}
    >
      <p
        className={`text-sm text-center ${
          text === statusActivation.active.value
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        {statusActivation?.[text === 1 ? "active" : "inactive"]?.label}
      </p>
    </section>
  );
};

export default StatusActivationTag;
