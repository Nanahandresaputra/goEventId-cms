import React from "react";

const CanvasComp = ({ children, className }) => {
  return (
    <section
      className={`h-[82vh] overflow-y-auto bg-white lg:p-3 2xl:p-5 rounded-lg ${className}`}
    >
      {children}
    </section>
  );
};

export default CanvasComp;
