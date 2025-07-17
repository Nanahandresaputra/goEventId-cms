import { Button, Table, Tag } from "antd";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPenyelenggaraAction } from "../../../store/features/management/penyelenggara";
import { ContextPenyelenggara } from "../../../pages/management/penyelenggara";
import { ContextApp } from "../../../layout";
import FormPenyelenggara from "./form-penyelenggara";
import { BiEdit } from "react-icons/bi";

const MainContentPenyelenggara = () => {
  const { penyelenggaraList, isLoadingGet } = useSelector(
    (state) => state.penyelenggara
  );
  const {
    setSelectedPenyelenggara,
    formPenyelenggara,
    openModalPenyelenggara,
  } = useContext(ContextPenyelenggara);
  const { wildSearch, dataIndex, setDataIndex } = useContext(ContextApp);

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Penyelenggara",
      dataIndex: "nama",
      key: "nama",
      // render: (row) => <p className="font-semibold">{row?.toUpperCase()}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // render: (row) => <p className="font-semibold">{row}</p>,
    },

    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            className="flex justify-center items-center"
            onClick={() => {
              formPenyelenggara.setFieldsValue({ operation: "u", ...record });
              openModalPenyelenggara();
            }}
            icon={<BiEdit className="text-2xl" />}
          />
        );
      },
    },
  ];

  const getDatas = useCallback(() => {
    dispatch(getPenyelenggaraAction()).catch(() => {});
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

  const dataSource = useMemo(() => {
    const filterData = penyelenggaraList?.filter((data) =>
      wildSearch === ""
        ? data
        : data.nama.toLowerCase().includes(wildSearch.toLowerCase())
    );

    return filterData;
  }, [penyelenggaraList, wildSearch]);

  useEffect(() => {
    if (dataSource?.length > 0) {
      setSelectedPenyelenggara({ ...dataSource[dataIndex], operation: "u" });
    } else {
      setSelectedPenyelenggara({});
    }
  }, [dataSource, dataIndex]);

  return (
    <section>
      <FormPenyelenggara />
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
              setSelectedPenyelenggara({ operation: "u", ...record });
              setDataIndex(
                dataSource?.findIndex((data) => data?.id === record?.id)
              );
            }, // click row
          };
        }}
        scroll={{ y: "calc(65vh - 4em)", x: true }}
      />
    </section>
  );
};

export default MainContentPenyelenggara;
