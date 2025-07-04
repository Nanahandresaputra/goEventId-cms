import React from "react";

const KeyLabelText = ({ keyVal = "test", value = "testval" }) => {
  return (
    <div className="grid grid-cols-8 text-gray-800">
      <div className="col-span-2 flex justify-between text-base">
        <p>{keyVal}</p>
        <span>:</span>
      </div>
      <div className="col-span-6 pl-4">
        <p className="text-base text-justify">{value}</p>
      </div>
    </div>
  );
};

export default KeyLabelText;
