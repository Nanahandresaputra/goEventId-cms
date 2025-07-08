import React, { useContext } from "react";
import KeyLabelText from "../../atoms/other/key-label-text";
import { Table, Tag } from "antd";
import { ContextPenyelenggara } from "../../../pages/management/penyelenggara";
import { formatDate } from "../../../helpers/date-format";
import StatusAcaraTag from "../../atoms/generate-tag/status-acara";

const DetailContentPenyelenggara = () => {
  const { selectedPenyelenggara } = useContext(ContextPenyelenggara);
  const columns = [
    {
      title: "Acara",
      dataIndex: "nama_acara",
      key: "nama_acara",
      //   render: (row) => <p className="font-semibold">{row?.toUpperCase()}</p>,
    },
    {
      title: "Tanggal",
      dataIndex: "waktu_acara",
      key: "waktu_acara",
      render: (row) => formatDate({ time: row }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (row) => <StatusAcaraTag text={row} />,
    },
  ];

  const dataSource = selectedPenyelenggara?.acara;

  return (
    <section className="space-y-8">
      <h1 className="text-[#14182999] font-semibold text-xl">
        Detail Penyelenggara
      </h1>
      <div className="space-y-1">
        <KeyLabelText
          keyVal="Penyelenggara"
          value={selectedPenyelenggara?.nama}
        />
        <KeyLabelText keyVal="Email" value={selectedPenyelenggara?.email} />
      </div>
      <h1 className="text-[#14182999] font-semibold text-xl">List Acara</h1>

      <Table
        columns={columns}
        size="small"
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [5, 10, 15, 20, 30, 50, 100],
          showSizeChanger: true,
        }}
        // pagination={false}
        // onrecord={(record) => ({
        //   onClick: () => {},
        //   onMouseEnter: (e) => e.stopPropagation(),
        // })}

        //   scroll={{ y: "calc(65vh - 4em)", x: true }}
      />
    </section>
  );
};

export default DetailContentPenyelenggara;
