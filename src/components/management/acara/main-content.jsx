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
import { BiEdit } from "react-icons/bi";
import dayjs from "dayjs";
import "dayjs/locale/id";

const MainContentAcara = () => {
  const { acaraList, isLoadingGet } = useSelector((state) => state.acara);

  const {
    setSelectedAcara,
    filterCategory,
    filterStatus,
    formAcara,
    openModalAcara,
    getDatasKabupatenKota,
  } = useContext(ContextAcara);

  const { wildSearch, dataIndex, setDataIndex } = useContext(ContextApp);

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

    return filterData;
  }, [acaraList, filterCategory, wildSearch, filterStatus]);

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
          record?.status === statusAcara.draft.value && (
            <Button
              type="primary"
              className="flex justify-center items-center"
              onClick={() => {
                getDatasKabupatenKota({ provinsiId: record.provinsi.id });
                formAcara.setFieldsValue({
                  ...record,
                  operation: "u",
                  waktu_acara: dayjs(record.waktu_acara),
                  kategori_id: record.kategori.id,
                  kabupaten_kota_id: record.kabupatenkota.id,
                  provinsi_id: record.provinsi.id,
                  user_id_penyelenggara: record.penyelenggara.id,
                });
                openModalAcara();
                console.log({
                  ...record,
                  operation: "u",
                  waktu_acara: dayjs(record.waktu_acara),
                });
              }}
              icon={<BiEdit className="text-2xl" />}
            />
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
    if (dataSource?.length > 0) {
      setSelectedAcara(dataSource[dataIndex]);
    } else {
      setSelectedAcara({});
    }
  }, [dataSource, dataIndex]);

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
        onRow={(record) => {
          return {
            onClick: () => {
              setDataIndex(
                dataSource?.findIndex((data) => data?.id === record?.id)
              );
              setSelectedAcara(record);
            }, // click row
          };
        }}
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
