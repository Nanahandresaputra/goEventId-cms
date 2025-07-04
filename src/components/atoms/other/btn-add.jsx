import React from "react";
import { PlusIcon } from "../../../assets/icon";

const ButtonAdd = ({ onClick = () => {} }) => {
  return (
    <button className="p-2 rounded-full bg-[#FF9E00] ml-2" onClick={onClick}>
      <PlusIcon width="30" height="30" />
    </button>
  );
};

export default ButtonAdd;
