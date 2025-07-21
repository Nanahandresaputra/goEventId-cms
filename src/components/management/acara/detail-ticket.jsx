import { Button, Popconfirm, Table } from "antd";
import { useCallback, useContext } from "react";
import { ContextAcara } from "../../../pages/management/acara";
import { useDispatch, useSelector } from "react-redux";
import { deleteTiketAcaraAction } from "../../../store/features/management/tiket-acara";
import { formatter } from "../../../helpers/formatter";
import { role_user, statusAcara } from "../../../helpers/status-data";
import { BiTrash } from "react-icons/bi";
import { parseJwt } from "../../../helpers/decode-token";

const DetailTicket = () => {
  const { selectedAcara, openModalTicket, setSelectedTiketAcara } =
    useContext(ContextAcara);

  const { isLoadingGet, tiketAcaraList, isLoadingOn } = useSelector(
    (state) => state.tiketAcara
  );

  const dispatch = useDispatch();

  const userData = localStorage?.token ? parseJwt(localStorage.token) : {};

  const getRole = userData?.role ?? "";

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
            <div className="flex items-center space-x-3">
              <Button
                type="primary"
                onClick={() => {
                  openModalTicket();
                  setSelectedTiketAcara({ operation: "u", ...record });
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Apakah Kamu yakin?"
                description="Data akan hilang sepenuh nya saat kamu hapus!"
                onConfirm={() => deleteDataTicket({ tiketAcaraId: record?.id })}
                // onCancel={cancel}
                okText="Hapus"
                cancelText="Batal"
              >
                <Button
                  color="danger"
                  variant="solid"
                  className="flex justify-center items-center"
                  loading={isLoadingOn}
                  icon={<BiTrash className="text-2xl" />}
                />
              </Popconfirm>
            </div>
          )
        );
      },
    },
  ].filter((data) =>
    getRole === role_user.admin.value ? data : data.dataIndex !== "action"
  );

  // console.log({ selectedAcara });

  const deleteDataTicket = useCallback(
    ({ tiketAcaraId }) => {
      dispatch(
        deleteTiketAcaraAction({ tiketAcaraId, acaraId: selectedAcara.id })
      ).catch(() => {});
    },
    [selectedAcara]
  );

  // useEffect(() => {
  //   getDataTickets();
  // }, [getDataTickets]);

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
