import React from "react";
import { Collapse } from "antd";
import DetailTicketPenjualan from "./detail-ticket";
import KeyLabelText from "../../atoms/other/key-label-text";

const DetailContentPenjualan = () => {
  return (
    <section className="space-y-5">
      <h1 className="text-[#14182999] font-semibold text-xl">
        Detail Penjualan Tiket
      </h1>
      <div className="space-y-7">
        <div className="space-y-1">
          <KeyLabelText
            keyVal="Acara"
            value="Indonesia vs Bahrain FWC Qualifer 2026"
          />
          <KeyLabelText keyVal="Penyelenggara" value="Penyelenggara Nama" />
        </div>
        <DetailTicketPenjualan />
      </div>
    </section>
  );
};

export default DetailContentPenjualan;
