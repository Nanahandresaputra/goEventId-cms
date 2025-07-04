import React from "react";
import KeyLabelText from "../../atoms/other/key-label-text";
import { Table, Tag } from "antd";

const DetailContentPenyelenggara = () => {
  const columns = [
    {
      title: "Acara",
      dataIndex: "acara",
      key: "acara",
      //   render: (row) => <p className="font-semibold">{row?.toUpperCase()}</p>,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      //   render: (row) => <p className="font-semibold">{row?.toUpperCase()}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (row) =>
        row === 1 ? (
          <Tag color="success" className="w-full text-center py-1">
            Publish
          </Tag>
        ) : (
          <Tag className="w-full text-center py-1" color="error">
            Draft
          </Tag>
        ),
    },
  ];

  const dummyData = [...Array(60)].map((_, idx) => ({
    key: idx,
    acara: `Nama Acara ${idx}`,
    tanggal: "24 Jan 2025 18:40",
    status: 1,
  }));

  return (
    <section className="space-y-8">
      <h1 className="text-[#14182999] font-semibold text-xl">
        Detail Penyelenggara
      </h1>
      <div className="space-y-1">
        <KeyLabelText keyVal="Penyelenggara" value="Nama Penyelenggara 1" />
        <KeyLabelText keyVal="Email" value="penyelenggara1@mail.com" />
      </div>
      <h1 className="text-[#14182999] font-semibold text-xl">List Acara</h1>

      <Table
        columns={columns}
        size="small"
        dataSource={dummyData}
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
