import React, { useContext } from "react";
import KeyLabelText from "../../atoms/other/key-label-text";
import { Button, Collapse, Empty, Image, Popconfirm } from "antd";
import DetailTicket from "./detail-ticket";
import { ContextAcara } from "../../../pages/management/acara";
import { formatDate } from "../../../helpers/date-format";
import FormTicket from "./form-ticket";
import { statusAcara } from "../../../helpers/status-data";
import { useSelector } from "react-redux";

const DetailContentAcara = () => {
  const {
    selectedAcara,
    openModalTicket,
    setSelectedTiketAcara,
    updateDataAcara,
  } = useContext(ContextAcara);

  const { isLoadingOn } = useSelector((state) => state.acara);

  // const htmlDecode = (content) => {
  //   let e = document.createElement("div");
  //   e.innerHTML = content;
  //   return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  // };

  const items = [
    {
      key: "1",
      label: (
        <h1 className="text-[#14182999] font-semibold text-xl">Detail Acara</h1>
      ),
      children: (
        <div className="space-y-6 w-full">
          <div className="object-cover flex justify-center items-center w-full overflow-hidden rounded-lg">
            <Image
              width={"100%"}
              src={`data:image/png;base64,${selectedAcara?.banner_img}`}
              alt="banner-img"
              className=" !min-w-full !min-h-full !rounded-lg"
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
        <Popconfirm
          title="Publish Acara"
          description="Setelah Acara dipublish maka tidak dapat mengubah data Acara maupun Tiket!"
          onConfirm={() =>
            updateDataAcara(
              { status: statusAcara.publish.value },
              selectedAcara?.id
            )
          }
          // onCancel={cancel}
          okText="Publish"
          cancelText="Batal"
        >
          <Button
            type="primary"
            disabled={selectedAcara?.status !== statusAcara.draft.value}
            onClick={(event) => {
              event.stopPropagation();
            }}
            loading={isLoadingOn}
          >
            {selectedAcara?.status === statusAcara.publish.value
              ? "Published"
              : selectedAcara?.status === statusAcara.expired.value
              ? statusAcara.expired.label
              : statusAcara.publish.label}
          </Button>
        </Popconfirm>
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
            setSelectedTiketAcara({});
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
