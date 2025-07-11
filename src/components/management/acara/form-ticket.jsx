import { Form, Modal } from "antd";
import React, { useContext } from "react";
import InputNumComp from "../../atoms/form/inputNumber";
import { ContextAcara } from "../../../pages/management/acara";
import InputText from "../../atoms/form/inputText";

const FormTicket = () => {
  const { modalTicket, closeModalTicket, formTicket } =
    useContext(ContextAcara);

  return (
    <Modal
      title="Form Ticket"
      open={modalTicket}
      onOk={() => {}}
      onCancel={closeModalTicket}
      confirmLoading={false}
    >
      <Form
        form={formTicket}
        layout="vertical"
        autoComplete="off"
        validateTrigger="onSubmit"
        className="w-full grid grid-cols-2 gap-x-5"
      >
        <InputText
          name={"tipe_tiket"}
          label={"Tipet Tiket"}
          required
          placeholder={"Masukan Tipe Tiket"}
          className={"col-span-2"}
        />
        <InputNumComp
          name={"kuota"}
          label={"Kuota"}
          required
          placeholder={"Masukan Kuota Tiket"}
          className={"!w-full col-span-1"}
        />
        <InputNumComp
          prefix={"Rp"}
          name={"harga"}
          label={"Harga"}
          required
          placeholder={"Masukan Harga Tiket"}
          className={"!w-full col-span-1"}
        />
      </Form>
    </Modal>
  );
};

export default FormTicket;
