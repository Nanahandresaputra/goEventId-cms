import { Button, Table } from "antd";
import { useContext, useMemo } from "react";
import { ContextReportingPenjualan } from "../../../pages/reporting/penjualan";
import { formatter } from "../../../helpers/formatter";
import { getColumnWidth } from "../../../helpers/table-column-width";

const DetailTicketPenjualan = () => {
  const { detailPenjualan } = useContext(ContextReportingPenjualan);

  const dataSource = useMemo(() => {
    return detailPenjualan?.details?.tiket ?? [];
  }, [detailPenjualan]);

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
  ].map((clm) => ({
    ...clm,
    title: <span style={{ whiteSpace: "nowrap" }}>{clm.title}</span>,
    className: "whitespace-nowrap",
    width: getColumnWidth(clm?.dataIndex, dataSource, clm?.title),
  }));

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
