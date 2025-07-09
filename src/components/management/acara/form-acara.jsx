import { Form, Modal } from "antd";
import React, { useContext } from "react";
import { ContextAcara } from "../../../pages/management/acara";

const FormAcara = () => {
  const { modalAcara, closeModalAcara, formAcara } = useContext(ContextAcara);
  return (
    <Modal
      title="Form TEmp title"
      open={modalAcara}
      // onOk={}
      onCancel={closeModalAcara}
      confirmLoading={false} //temp
    >
      <Form form={formAcara} autoComplete="off"></Form>
    </Modal>
  );
};

export default FormAcara;
