import { Button, Table, Tag } from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../store/features/management/users";
import StatusActivationTag from "../../atoms/generate-tag/status-activation";
import RolerUserTag from "../../atoms/generate-tag/role-user";

const MainContentUsers = () => {
  const { usersList } = useSelector((state) => state.users);
  const columns = [
    {
      title: "Nama",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      render: (row) => <RolerUserTag text={row} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (row) => <StatusActivationTag text={row} />,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "12%",
      align: "right",
      render: (_, record) => {
        return (
          <Button type="primary" onClick={() => console.log(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  const dataSource = useMemo(() => {
    return usersList;
  }, [usersList]);

  const dispatch = useDispatch();

  const getDatas = useCallback(() => {
    dispatch(getUsersAction()).catch(() => {}, []);
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

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

export default MainContentUsers;
