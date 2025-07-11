import React, { useContext } from "react";
import KeyLabelText from "../../atoms/other/key-label-text";
import { Button, Collapse, Empty, Image } from "antd";
import DetailTicket from "./detail-ticket";
import { ContextAcara } from "../../../pages/management/acara";
import { formatDate } from "../../../helpers/date-format";
import FormTicket from "./form-ticket";
import { statusAcara } from "../../../helpers/status-data";

const DetailContentAcara = () => {
  const { selectedAcara, openModalTicket } = useContext(ContextAcara);

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
              src={`data:image/png;base64,${selectedAcara?.banner_img}`}
              alt="banner-img"
              className="!h-full !w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <KeyLabelText
              keyVal="Acara"
              value={`${selectedAcara?.nama_acara}`}
            />
            <KeyLabelText
              keyVal="Penyelenggara"
              value={selectedAcara?.penyelenggara?.nama}
            />
            <KeyLabelText
              keyVal="Tanggal"
              value={formatDate({ time: selectedAcara?.waktu_acara })}
            />
            <KeyLabelText
              keyVal="Tempat"
              value={`${selectedAcara?.alamat}, ${selectedAcara?.kabupatenkota?.nama}, ${selectedAcara?.provinsi?.nama}`}
            />
            <KeyLabelText keyVal="Deskripsi" value={selectedAcara?.deskripsi} />
          </div>
        </div>
      ),
      extra: (
        <Button
          type="primary"
          disabled={selectedAcara?.status !== statusAcara.draft.value}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {selectedAcara?.status === statusAcara.publish.value
            ? "Published"
            : selectedAcara?.status === statusAcara.expired.value
            ? statusAcara.expired.label
            : statusAcara.publish.label}
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
                src={`data:image/png;base64,${selectedAcara?.map_tiket_img}`}
                alt="banner-img"
                className="!h-full !w-full !object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <DetailTicket />
        </div>
      ),
      extra: selectedAcara?.status === statusAcara.draft.value && (
        <Button
          type="primary"
          onClick={(event) => {
            event.stopPropagation();
            openModalTicket();
          }}
        >
          Tambah Tiket
        </Button>
      ),
    },
  ];
  return (
    <section className="h-full w-full">
      <FormTicket />
      {selectedAcara?.nama_acara ? (
        <Collapse
          defaultActiveKey={["1", "2"]}
          // expandIconPosition="end"
          // ghost
          bordered={false}
          items={items}
        />
      ) : (
        <div>
          <h1 className="text-[#14182999] font-semibold text-xl">
            Detail Acara
          </h1>
          <Empty />
        </div>
      )}
    </section>
  );
};

export default DetailContentAcara;
