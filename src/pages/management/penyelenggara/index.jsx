import React from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import ExtraHeaderAcara from "../../../components/management/acara/extra-header";

import MainContentPenyelenggara from "../../../components/management/penyelenggara/main-content";
import DetailContentPenyelenggara from "../../../components/management/penyelenggara/detail-content";

const ManagementPenyelenggara = () => {
  return (
    <LayoutCanvas
      extraMainActionHeader={() => (
        <ExtraHeaderAcara
          onChangeSearch={() => {}}
          //   onClickBtnAdd={openModalCreate}
          //   onResultXls={handleXlsx}
        />
      )}
      childMain={() => (
        <section className="space-y-4 h-3/4 ">
          <MainContentPenyelenggara profileDataLevel={"test"} />
        </section>
      )}
      childSecondary={() => (
        <div>
          <DetailContentPenyelenggara />
        </div>
      )}
    />
  );
};

export default ManagementPenyelenggara;
