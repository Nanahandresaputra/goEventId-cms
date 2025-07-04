import { Button, Table } from "antd";

const DetailTicket = () => {
  const columns = [
    {
      title: "Tipe Tiket",
      dataIndex: "tiket",
      key: "tiket",
      //   render: (row) => <p className="font-semibold">{row?.toUpperCase()}</p>,
    },
    {
      title: "Kuota",
      dataIndex: "kuota",
      key: "kuota",
      //   render: (row) => <p className="font-semibold">{row}</p>,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      //   render: (row) => <p className="font-semibold">{row}</p>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (
          <Button type="primary" onClick={() => console.log(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  const dummyData = [...Array(5)].map((_, idx) => ({
    key: idx,
    tiket: `Tipe ${idx}`,
    kuota: 4000,
    harga: 120000,
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

export default DetailTicket;
