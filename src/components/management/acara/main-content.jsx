import { Button, Table, Tag } from "antd";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAcaraAction } from "../../../store/features/management/acara";
import { getColumnWidth } from "../../../helpers/table-column-width";
import { ContextAcara } from "../../../pages/management/acara";
import { formatDate } from "../../../helpers/date-format";
import StatusAcaraTag from "../../atoms/generate-tag/status-acara";
import { ContextApp } from "../../../layout";
import FormAcara from "./form-acara";
import { statusAcara } from "../../../helpers/status-data";

const MainContentAcara = () => {
  const { acaraList, isLoadingGet } = useSelector((state) => state.acara);

  const { setSelectedAcara, filterCategory, filterStatus } =
    useContext(ContextAcara);

  const { wildSearch } = useContext(ContextApp);

  const dataSource = useMemo(() => {
    const filterData = acaraList
      .filter((data) =>
        filterCategory === -1 ? data : data.kategori.id === filterCategory
      )
      .filter((data) =>
        filterStatus === -1 ? data : data.status === filterStatus
      )
      .filter((data) =>
        wildSearch === ""
          ? data
          : data.nama_acara.toLowerCase().includes(wildSearch.toLowerCase())
      );

    if (filterData?.length > 0) {
      setSelectedAcara(filterData[0]);
    } else {
      setSelectedAcara({});
    }
    return filterData;
  }, [acaraList, filterCategory, wildSearch, setSelectedAcara, filterStatus]);

  const columns = [
    {
      title: "Acara",
      dataIndex: "nama_acara",
      key: "nama_acara",
    },
    {
      title: "Penyelenggara",
      dataIndex: "penyelenggara",
      key: "penyelenggara",
      render: (row) => row?.nama,
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
      render: (row) => row?.nama_kategori,
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
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (
          record?.status === statusAcara.draft && (
            <Button type="primary" onClick={() => console.log(record)}>
              Edit
            </Button>
          )
        );
      },
    },
  ].map((clm) => ({
    ...clm,
    title: <span style={{ whiteSpace: "nowrap" }}>{clm.title}</span>,
    className: "whitespace-nowrap",
    width: getColumnWidth(clm?.dataIndex, dataSource, clm?.title),
  }));

  // const handleSubmit = () => {

  // };

  // const showData = useMemo(() => {
  //   return wildSearch.length > 0
  //     ? companies.filter((company) =>
  //         company?.name?.toLowerCase()?.includes(wildSearch.toLowerCase())
  //       )
  //     : companies;
  // }, [wildSearch, companies]);

  // useEffect(() => {
  //   getCompaniesData();
  // }, []);

  const dispatch = useDispatch();

  const getDatas = useCallback(() => {
    dispatch(getAcaraAction()).catch(() => {});
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <section>
      <FormAcara />
      <Table
        loading={isLoadingGet}
        columns={columns}
        size="large"
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

        scroll={{ y: "calc(57vh - 4em)", x: true }}
      />
    </section>
  );
};

export default MainContentAcara;
