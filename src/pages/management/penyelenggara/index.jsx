import React, { createContext, useState } from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import ExtraHeaderAcara from "../../../components/management/acara/extra-header";

import MainContentPenyelenggara from "../../../components/management/penyelenggara/main-content";
import DetailContentPenyelenggara from "../../../components/management/penyelenggara/detail-content";

export const ContextPenyelenggara = createContext();

const ManagementPenyelenggara = () => {
  const [selectedPenyelenggara, setSelectedPenyelenggara] = useState({});
  return (
    <ContextPenyelenggara.Provider
      value={{ selectedPenyelenggara, setSelectedPenyelenggara }}
    >
      <LayoutCanvas
        extraMainActionHeader={() => (
          <ExtraHeaderAcara
            placeholder="Cari Penyelenggara"
            onChangeSearch={() => {}}
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
