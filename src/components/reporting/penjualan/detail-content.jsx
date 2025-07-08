import React, { useContext } from "react";
import { Collapse } from "antd";
import DetailTicketPenjualan from "./detail-ticket";
import KeyLabelText from "../../atoms/other/key-label-text";
import { ContextReportingPenjualan } from "../../../pages/reporting/penjualan";

const DetailContentPenjualan = () => {
  const { detailPenjualan } = useContext(ContextReportingPenjualan);
  return (
    <section className="space-y-5">
      <h1 className="text-[#14182999] font-semibold text-xl">
        Detail Penjualan Tiket
      </h1>
      <div className="space-y-7">
        <div className="space-y-1">
          <KeyLabelText keyVal="Acara" value={detailPenjualan?.nama_acara} />
          <KeyLabelText
            keyVal="Penyelenggara"
            value={detailPenjualan?.penyelenggara}
          />
        </div>
        <DetailTicketPenjualan />
      </div>
    </section>
  );
};

export default DetailContentPenjualan;
