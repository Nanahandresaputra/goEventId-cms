import { Form, Modal } from "antd";
import React, { useContext, useState } from "react";
import { ContextPenyelenggara } from "../../../pages/management/penyelenggara";
import InputText from "../../atoms/form/inputText";
import InputPwd from "../../atoms/form/inputPwd";
import { useSelector } from "react-redux";

const FormPenyelenggara = () => {
  const {
    modalPenyelenggara,
    closeModalPenyelenggara,
    formPenyelenggara,
    createPenyelenggara,
    updatePenyelenggara,
    selectedPenyelenggara,
  } = useContext(ContextPenyelenggara);

  console.log({ selectedPenyelenggara });

  const [isChange, setIsChange] = useState(false);

  const { isLoadingOn } = useSelector((state) => state.penyelenggara);

  const initalVal = formPenyelenggara?.getFieldsValue();

  const handleSubmit = () => {
    formPenyelenggara.submit();
    formPenyelenggara
      .validateFields()
      .then((res) => {
        let body = res;

        delete body?.id;
        delete body?.operation;

        if (initalVal?.operation === "u") {
          updatePenyelenggara(body);
        } else {
          createPenyelenggara(body);
        }
      })
      .catch(() => {});
  };

  return (
    <Modal
      title={
        selectedPenyelenggara?.operation === "u"
          ? "Edit Data Penyelenggara"
          : "Tambah Penyelenggara"
      }
      open={modalPenyelenggara}
      onOk={handleSubmit}
      onCancel={closeModalPenyelenggara}
      confirmLoading={isLoadingOn}
    >
      <Form
        form={formPenyelenggara}
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
          required={selectedPenyelenggara?.operation !== "u"}
          placeholder={"Masukan Password"}
          isChange={isChange}
          setIsChange={setIsChange}
          change={selectedPenyelenggara?.operation === "u"}
        />
      </Form>
    </Modal>
  );
};

export default FormPenyelenggara;
