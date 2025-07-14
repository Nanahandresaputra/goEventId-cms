import { Button, Table } from "antd";
import { useCallback, useContext, useEffect } from "react";
import { ContextAcara } from "../../../pages/management/acara";
import { useDispatch, useSelector } from "react-redux";
import { getTiketAcaraAction } from "../../../store/features/management/tiket-acara";
import { formatter } from "../../../helpers/formatter";
import { statusAcara } from "../../../helpers/status-data";

const DetailTicket = () => {
  const { selectedAcara } = useContext(ContextAcara);

  const { isLoadingGet, tiketAcaraList } = useSelector(
    (state) => state.tiketAcara
  );

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Tipe Tiket",
      dataIndex: "tipe_tiket",
      key: "tipe_tiket",
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
      dataIndex: "harga_tiket",
      key: "harga_tiket",
      render: (row) => `Rp ${formatter(row)}`,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (
          selectedAcara?.status !== statusAcara.publish.value && (
            <Button type="primary" onClick={() => console.log(record)}>
              Edit
            </Button>
          )
        );
      },
    },
  ];

  // console.log({ selectedAcara });

  console.log("acara_id --->", selectedAcara?.id);

  const getDataTickets = useCallback(() => {
    dispatch(getTiketAcaraAction({ acara_id: selectedAcara?.id })).catch(
      () => {}
    );
  }, [selectedAcara]);

  useEffect(() => {
    getDataTickets();
  }, [getDataTickets]);

  return (
    <Table
      loading={isLoadingGet}
      columns={columns}
      size="small"
      dataSource={tiketAcaraList}
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
