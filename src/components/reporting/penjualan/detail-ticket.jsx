import { Button, Table } from "antd";

const DetailTicketPenjualan = () => {
  const columns = [
    {
      title: "Tipe Tiket",
      dataIndex: "tiket",
      key: "tiket",
    },
    {
      title: "Kuota",
      dataIndex: "kuota",
      key: "kuota",
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
    },
    {
      title: "Tiket Terjual",
      dataIndex: "tiketTerjual",
      key: "tiketTerjual",
    },
    {
      title: "Pendapatan Tiket",
      dataIndex: "pendapatanTiket",
      key: "pendapatanTiket",
    },
  ];

  const dummyData = [...Array(3)].map((_, idx) => ({
    key: idx,
    tiket: `Tipe Tribun Utara ${idx}`,
    kuota: 4000,
    harga: 120000,
    tiketTerjual: 11,
    pendapatanTiket: 22000,
  }));
  return (
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
  );
};

export default DetailTicketPenjualan;
