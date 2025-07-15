import { Form, Modal } from "antd";
import React, { useCallback, useContext, useEffect } from "react";
import InputNumComp from "../../atoms/form/inputNumber";
import { ContextAcara } from "../../../pages/management/acara";
import InputText from "../../atoms/form/inputText";
import { useDispatch, useSelector } from "react-redux";
import {
  createTiketAcaraAction,
  updateTiketAcaraAction,
} from "../../../store/features/management/tiket-acara";
import { notifSuccess } from "../../../helpers/notif";

const FormTicket = () => {
  const {
    modalTicket,
    closeModalTicket,
    formTicket,
    setModalTicket,
    selectedAcara,
    selectedTiketAcara,
  } = useContext(ContextAcara);

  const { isLoadingOn } = useSelector((state) => state.tiketAcara);

  const dispatch = useDispatch();

  const createDataTicket = useCallback((body) => {
    dispatch(createTiketAcaraAction({ body }))
      .then(() => {
        formTicket.resetFields();
        notifSuccess({ method: "create" });
        setModalTicket(false);
      })
      .catch(() => {});
  }, []);

  const updateDataTicket = useCallback((body, tiketAcaraId) => {
    dispatch(updateTiketAcaraAction({ body, tiketAcaraId }))
      .then(() => {
        formTicket.resetFields();
        notifSuccess({ method: "edit" });
        setModalTicket(false);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = () => {
    formTicket.submit();
    formTicket
      .validateFields()
      .then((res) => {
        let body = { ...res, acara_id: selectedAcara?.id };
        delete body?.operation;
        delete body?.id;

        console.log({ selectedTiketAcara });

        if (selectedTiketAcara?.operation === "u") {
          updateDataTicket(body, selectedTiketAcara?.id);
        } else {
          createDataTicket({ id: selectedAcara?.id, ...body });
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (selectedTiketAcara?.operation === "u") {
      formTicket?.setFieldsValue(selectedTiketAcara);
    }
  }, [selectedTiketAcara]);

  return (
    <Modal
      title={
        selectedTiketAcara?.operation === "u" ? "Edit Tiket" : "Tambah Tiket"
      }
      open={modalTicket}
      onOk={handleSubmit}
      onCancel={closeModalTicket}
      confirmLoading={isLoadingOn}
    >
      <Form
        form={formTicket}
        layout="vertical"
        autoComplete="off"
        validateTrigger="onSubmit"
        className="w-full grid grid-cols-2 gap-x-5"
      >
        <Form.Item name={"operation"} className="opacity-0" />
        <Form.Item name={"id"} className="opacity-0" />
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
          name={"harga_tiket"}
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
