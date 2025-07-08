import { Button, Table } from "antd";
import { useContext, useMemo } from "react";
import { ContextReportingPenjualan } from "../../../pages/reporting/penjualan";
import { formatter } from "../../../helpers/formatter";

const DetailTicketPenjualan = () => {
  const { detailPenjualan } = useContext(ContextReportingPenjualan);

  // "tipe_tiket": "Tribun Selatan",
  //                       "kuota": 6000,
  //                       "tiket_terjual": 11,
  //                       "harga_tiket": 200000

  const columns = [
    {
      title: "Tipe Tiket",
      dataIndex: "tipe_tiket",
      key: "tipe_tiket",
    },
    {
      title: "Kuota",
      dataIndex: "kuota",
      key: "kuota",
    },
    {
      title: "Harga",
      dataIndex: "harga_tiket",
      key: "harga_tiket",
      render: (row) => `Rp ${formatter(row)}`,
    },
    {
      title: "Tiket Terjual",
      dataIndex: "tiket_terjual",
      key: "tiket_terjual",
    },
    {
      title: "Pendapatan Tiket",
      dataIndex: "pendapatan_tiket",
      key: "pendapatan_tiket",
      render: (row) => `Rp ${formatter(row)}`,
    },
  ];

  const dataSource = useMemo(() => {
    return detailPenjualan?.tiket;
  }, [detailPenjualan]);
  return (
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
  );
};

export default DetailTicketPenjualan;
