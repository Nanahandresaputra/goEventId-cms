import React from "react";
import KeyLabelText from "../../atoms/other/key-label-text";
import { Button, Collapse, Image } from "antd";
import { bannerDummy, mapDummy } from "../../../assets/images";
import DetailTicket from "./detail-ticket";

const DetailContentAcara = () => {
  const items = [
    {
      key: "1",
      label: (
        <h1 className="text-[#14182999] font-semibold text-xl">Detail Acara</h1>
      ),
      children: (
        <div className="space-y-6">
          <div className="object-cover flex items-center w-full overflow-hidden h-36 rounded-lg">
            <Image
              src={bannerDummy}
              alt="banner-img"
              className="!h-full !w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <KeyLabelText
              keyVal="Acara"
              value="Indonesia vs Bahrain FWC Qualifer 2026"
            />
            <KeyLabelText keyVal="Penyelenggara" value="Penyelenggara Nama" />
            <KeyLabelText keyVal="Tanggal" value="12 Jan 25" />
            <KeyLabelText
              keyVal="Tempat"
              value="Stadion Gelora Bung Karno, Senayan, Jakarta Pusat, DKI Jakarta"
            />
            <KeyLabelText
              keyVal="Deskripsi"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam dignissim, faucibus elit in, efficitur magna. Mauris tristique accumsan consectetur. Vivamus venenatis lectus id leo congue tempor. Nulla facilisi. Etiam pretium aliquet urna id elementum. Mauris venenatis nulla sollicitudin turpis laoreet, non placerat lacus auctor. Ut bibendum non ligula nec auctor. Quisque consectetur vulputate mauris ac volutpat. Vivamus at elit at tellus sagittis volutpat id accumsan quam."
            />
          </div>
        </div>
      ),
      extra: (
        <Button
          type="primary"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Publish
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <h1 className="text-[#14182999] font-semibold text-xl">Detail Tiket</h1>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex justify-center w-full">
            <div className="object-cover flex items-center w-[400px] overflow-hidden rounded-lg">
              <Image
                src={mapDummy}
                alt="banner-img"
                className="!h-full !w-full !object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <DetailTicket />
        </div>
      ),
      extra: (
        <Button
          type="primary"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Tambah Tiket
        </Button>
      ),
    },
  ];
  return (
    <section>
      <Collapse
        defaultActiveKey={["1", "2"]}
        // expandIconPosition="end"
        // ghost
        bordered={false}
        items={items}
      />
    </section>
  );
};

export default DetailContentAcara;
