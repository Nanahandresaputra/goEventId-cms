import React from "react";

const TrashIcon = ({ width = "24", height = "24" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2L9 3H3V5H4.10938L5.89258 20.2559V20.2637C6.0236 21.2503 6.88032 22 7.875 22H16.1231C17.1177 22 17.9745 21.2503 18.1055 20.2637L18.1074 20.2559L19.8906 5H21V3H15L14 2H10ZM6.125 5H17.875L16.1231 20H7.875L6.125 5Z"
        fill="#FA5252"
      />
    </svg>
  );
};

export default TrashIcon;
