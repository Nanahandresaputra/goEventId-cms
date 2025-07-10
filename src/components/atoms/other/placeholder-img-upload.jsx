import React from "react";
import { FaImage } from "react-icons/fa";

const PlaceholderImgUpload = ({ text = "upload image" }) => {
  return (
    <section className="w-full flex flex-col items-center justify-center space-y-2">
      <FaImage className="text-gray-400 text-4xl" />
      <p className=" text-gray-400">{text}</p>
    </section>
  );
};

export default PlaceholderImgUpload;
