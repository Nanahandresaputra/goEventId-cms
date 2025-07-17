import React, { createContext, useCallback, useState } from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";

import MainContentPenyelenggara from "../../../components/management/penyelenggara/main-content";
import DetailContentPenyelenggara from "../../../components/management/penyelenggara/detail-content";
import ExtraHeader from "../../../components/atoms/other/extra-header";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import {
  createPenyelenggaraAction,
  updatePenyelenggaraAction,
} from "../../../store/features/management/penyelenggara";

export const ContextPenyelenggara = createContext({});

const ManagementPenyelenggara = () => {
  const [selectedPenyelenggara, setSelectedPenyelenggara] = useState({});
  const [modalPenyelenggara, setModalPenyelenggara] = useState(false);
  const [formPenyelenggara] = Form.useForm();

  const dispatch = useDispatch();

  const openModalPenyelenggara = () => {
    setModalPenyelenggara(true);
  };

  const closeModalPenyelenggara = () => {
    formPenyelenggara.resetFields();
    setModalPenyelenggara(false);
  };

  const createPenyelenggara = useCallback((body) => {
    dispatch(createPenyelenggaraAction({ body }))
      .then(() => {
        formPenyelenggara.resetFields();
        setModalPenyelenggara(false);
      })
      .catch(() => {});
  }, []);

  const updatePenyelenggara = useCallback(
    (body) => {
      dispatch(
        updatePenyelenggaraAction({
          body,
          penyeleggaraId: selectedPenyelenggara?.id,
        })
      )
        .then(() => {
          formPenyelenggara.resetFields();
          setModalPenyelenggara(false);
        })
        .catch(() => {});
    },
    [selectedPenyelenggara]
  );

  return (
    <ContextPenyelenggara.Provider
      value={{
        selectedPenyelenggara,
        setSelectedPenyelenggara,
        formPenyelenggara,
        openModalPenyelenggara,
        closeModalPenyelenggara,
        modalPenyelenggara,
        createPenyelenggara,
        updatePenyelenggara,
      }}
    >
      <LayoutCanvas
        extraMainActionHeader={() => (
          <ExtraHeader
            placeholder="Cari Penyelenggara"
            onClickBtn={() => {
              setSelectedPenyelenggara({
                ...selectedPenyelenggara,
                operation: "c",
              });
              openModalPenyelenggara();
            }}
            //   onClickBtnAdd={openModalCreate}
            //   onResultXls={handleXlsx}
          />
        )}
        childMain={() => (
          <section className="space-y-4 h-3/4 ">
            <MainContentPenyelenggara />
          </section>
        )}
        childSecondary={() => (
          <div>
            <DetailContentPenyelenggara />
          </div>
        )}
      />
    </ContextPenyelenggara.Provider>
  );
};

export default ManagementPenyelenggara;
