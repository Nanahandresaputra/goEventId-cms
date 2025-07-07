import { Button, Table, Tag } from "antd";
import React from "react";
import { getColumnWidth } from "../../../helpers/table-column-width";

const MainContentPenjualan = () => {
  const dataSource = [...Array(28)].map((_, idx) => ({
    key: idx,
    acara: "Indonesia vs Bahrain FWC Qualifer 2026",
    tanggal: "22 Januari 2025",
    tiketTerjual: 11,
    pendapatan: 22000,
    status: 1,
  }));
  const columns = [
    {
      title: "Acara",
      dataIndex: "acara",
      key: "acara",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
    {
      title: "Total Tiket Terjual",
      dataIndex: "tiketTerjual",
      key: "tiketTerjual",
      align: "right",
    },

    {
      title: "Total Pendapatan",
      dataIndex: "pendapatan",
      key: "pendapatan",
      align: "right",
    },
  ].map((clm) => ({
    ...clm,
    title: <span style={{ whiteSpace: "nowrap" }}>{clm.title}</span>,
    className: "whitespace-nowrap",
    width: getColumnWidth(clm?.dataIndex, dataSource, clm?.title),
  }));

  const footerShow = () => {
    const total = dataSource.reduce(
      (accumulator, currentValue) => accumulator + currentValue.pendapatan,
      0
    );
    const qty = dataSource.reduce(
      (accumulator, currentValue) => accumulator + currentValue.tiketTerjual,
      0
    );

    return (
      <div className="grid grid-cols-6 w-full pr-[1em]">
        <p className="font-semibold col-span-4">Total</p>
        <p className="font-semibold col-span-1 text-end">{qty}</p>
        <p className="font-semibold col-span-1 text-end">Rp {total}</p>
      </div>
    );
  };

  return (
    <section>
      <Table
        columns={columns}
        size="large"
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [5, 10, 15, 20, 30, 50, 100],
          showSizeChanger: true,
        }}
        scroll={{ y: "calc(52vh - 4em)", x: true }}
        footer={dataSource.length > 0 && footerShow}
      />
    </section>
  );
};

export default MainContentPenjualan;
