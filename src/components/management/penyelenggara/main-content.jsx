import { Button, Table, Tag } from "antd";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPenyelenggaraAction } from "../../../store/features/management/penyelenggara";
import { ContextPenyelenggara } from "../../../pages/management/penyelenggara";

const MainContentPenyelenggara = () => {
  const { penyelenggaraList, isLoadingGet } = useSelector(
    (state) => state.penyelenggara
  );
  const { setSelectedPenyelenggara } = useContext(ContextPenyelenggara);

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
          <Button type="primary" onClick={() => console.log(record)}>
            Edit
          </Button>
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
    if (penyelenggaraList?.length > 0) {
      setSelectedPenyelenggara(penyelenggaraList[0]);
    }
    return penyelenggaraList;
  }, [penyelenggaraList]);

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

  return (
    <section>
      {/* <Modal
          title={"Tambah Perusahaan"}
          open={isOpenForm}
          onCancel={closeModal}
          onOk={handleSubmit}
          confirmLoading={isLoading}
        >
          <FormModalCompany />
        </Modal> */}
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

        scroll={{ y: "calc(65vh - 4em)", x: true }}
      />
    </section>
  );
};

export default MainContentPenyelenggara;
