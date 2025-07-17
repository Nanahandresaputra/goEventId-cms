import { Button, Table, Tag } from "antd";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../store/features/management/users";
import StatusActivationTag from "../../atoms/generate-tag/status-activation";
import RolerUserTag from "../../atoms/generate-tag/role-user";
import { ContextUsers } from "../../../pages/management/user";
import FormUser from "./form-user";
import { BiEdit } from "react-icons/bi";
import { ContextApp } from "../../../layout";
import { parseJwt } from "../../../helpers/decode-token";

const MainContentUsers = () => {
  const { usersList } = useSelector((state) => state.users);
  const { setSelectedUsers, formUsers, openModalUsers } =
    useContext(ContextUsers);

  const { wildSearch } = useContext(ContextApp);

  const userData = localStorage?.token ? parseJwt(localStorage.token) : {};

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
          userData?.id !== record?.id && (
            <Button
              type="primary"
              className="flex justify-center items-center"
              onClick={() => {
                formUsers?.setFieldsValue({ ...record, operation: "u" });
                openModalUsers();
              }}
              icon={<BiEdit className="text-2xl" />}
            />
          )
        );
      },
    },
  ];

  const dataSource = useMemo(() => {
    const filterData = usersList?.filter((data) =>
      wildSearch === ""
        ? data
        : data.nama.toLowerCase().includes(wildSearch.toLowerCase())
    );

    return filterData;
  }, [usersList, wildSearch]);

  const dispatch = useDispatch();

  const getDatas = useCallback(() => {
    dispatch(getUsersAction()).catch(() => {}, []);
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <section>
      <FormUser />
      <Table
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
              setSelectedUsers({ operation: "u", ...record });
            }, // click row
          };
        }}
        scroll={{ y: "calc(65vh - 4em)", x: true }}
      />
    </section>
  );
};

export default MainContentUsers;
