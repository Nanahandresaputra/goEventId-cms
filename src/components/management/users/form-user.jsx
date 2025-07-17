import { Form, Modal } from "antd";
import React, { useContext, useState } from "react";
import InputText from "../../atoms/form/inputText";
import InputPwd from "../../atoms/form/inputPwd";
import { useSelector } from "react-redux";
import { ContextUsers } from "../../../pages/management/user";

const FormUser = () => {
  const {
    modalUsers,
    closeModalUsers,
    createUser,
    updateUser,
    formUsers,
    selectedUsers,
  } = useContext(ContextUsers);

  const [isChange, setIsChange] = useState(false);

  const { isLoadingOn } = useSelector((state) => state.users);

  const initalVal = formUsers?.getFieldsValue();

  console.log({ initalVal });

  const handleSubmit = () => {
    formUsers.submit();
    formUsers
      .validateFields()
      .then((res) => {
        let body = res;

        delete body?.id;
        delete body?.operation;

        if (selectedUsers?.operation === "u") {
          updateUser({ ...body, role: "admin" });
        } else {
          createUser({ ...body, role: "admin" });
        }
      })
      .catch(() => {});
  };

  return (
    <Modal
      title={
        selectedUsers.operation === "u"
          ? "Edit Data User Admin"
          : "Tambah User Admin"
      }
      open={modalUsers}
      onOk={handleSubmit}
      onCancel={closeModalUsers}
      confirmLoading={isLoadingOn}
    >
      <Form
        form={formUsers}
        layout="vertical"
        autoComplete="off"
        validateTrigger="onSubmit"
        className="w-full "
      >
        <Form.Item name={"operation"} className="opacity-0 !h-0 !w-0 !m-0" />
        <Form.Item name={"id"} className="opacity-0 !h-0 !w-0 !m-0" />
        <InputText
          name={"nama"}
          label={"Nama"}
          required
          placeholder={"Masukan Nama Penyelenggara"}
        />
        <InputText
          name={"email"}
          label={"Email"}
          required
          type="email"
          placeholder={"Masukan Email Penyelenggara"}
        />
        <InputPwd
          name={"password"}
          label={"Password"}
          required={selectedUsers?.operation !== "u"}
          placeholder={"Masukan Password"}
          isChange={isChange}
          setIsChange={setIsChange}
          change={selectedUsers?.operation === "u"}
        />
      </Form>
    </Modal>
  );
};

export default FormUser;
