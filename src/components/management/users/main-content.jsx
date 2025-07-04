import { Button, Table, Tag } from "antd";
import React from "react";

const MainContentUsers = () => {
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
      // render: (row) => <p className="font-semibold">{row}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (row) =>
        row === 1 ? (
          <Tag color="success" className="w-full text-center py-1">
            Publish
          </Tag>
        ) : (
          <Tag className="w-full text-center py-1" color="error">
            Draft
          </Tag>
        ),
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

  const dataSource = [...Array(28)].map((_, idx) => ({
    key: idx,
    nama: `Nama User ${idx + 1}`,
    email: `penyelenggara${idx + 1}@mail.com`,
    role: `Admin`,
    status: 1,
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
