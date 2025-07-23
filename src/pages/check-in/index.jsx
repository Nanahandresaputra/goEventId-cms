import React from "react";
import { logoTransparent } from "../../assets/images";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CheckIn = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-screen bg-[#225246] flex flex-col items-center justify-between py-[10vh]">
      <p className="text-white text-2xl font-semibold">
        Scan Tiket Acara GoEventID
      </p>
      <img src={logoTransparent} alt="logo-scan" />
      <Button
        type="primary"
        className="w-9/12 !py-6 !font-semibold !text-2xl"
        onClick={() => navigate("/check-in/scan")}
      >
        Scan Tiket
      </Button>
    </section>
  );
};

export default CheckIn;
