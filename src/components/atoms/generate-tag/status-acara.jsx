import React from "react";
import { statusAcara } from "../../../helpers/status-data";

const StatusAcaraTag = ({ text }) => {
  return (
    <section
      className={`py-1 px-3 rounded-lg  ${
        text === statusAcara.publish.value
          ? "bg-cyan-100 border border-cyan-700"
          : text === statusAcara.draft.value
          ? "bg-orange-100 border border-orange-700"
          : "bg-red-100 border border-red-700"
      }`}
    >
      <p
        className={`text-sm  text-center ${
          text === statusAcara.publish.value
            ? "text-cyan-700"
            : statusAcara.draft.value
            ? "text-orange-700"
            : "text-red-700"
        }`}
      >
        {statusAcara?.[text]?.label}
      </p>
    </section>
  );
};

export default StatusAcaraTag;
