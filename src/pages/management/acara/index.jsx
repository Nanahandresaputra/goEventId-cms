import React, { createContext, useState } from "react";
import MainContentAcara from "../../../components/management/acara/main-content";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import ExtraHeaderAcara from "../../../components/management/acara/extra-header";
import DetailContentAcara from "../../../components/management/acara/detail-content";
import HeaderFilterAcara from "../../../components/management/acara/header-filter-acara";

export const ContextAcara = createContext();

const ManagementAcara = () => {
  const [selectedAcara, setSelectedAcara] = useState({});

  const [filterCategory, setFilterCategory] = useState(-1);
  const [filterStatus, setFilterStatus] = useState(-1);

  return (
    <ContextAcara.Provider
      value={{
        selectedAcara,
        setSelectedAcara,
        filterCategory,
        setFilterCategory,
        filterStatus,
        setFilterStatus,
      }}
    >
      <LayoutCanvas
        extraMainActionHeader={() => (
          <ExtraHeaderAcara
            placeholder="Cari berdasarkan acara"
            onChangeSearch={() => {}}
            //   onClickBtnAdd={openModalCreate}
            //   onResultXls={handleXlsx}
          />
        )}
        childMain={() => (
          <section className="space-y-4 h-3/4 ">
            <HeaderFilterAcara />
            <MainContentAcara />
          </section>
        )}
        childSecondary={() => (
          <div>
            <DetailContentAcara />
          </div>
        )}
      />
    </ContextAcara.Provider>
  );
};

export default ManagementAcara;
