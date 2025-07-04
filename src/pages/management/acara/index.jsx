import React from "react";
import MainContentAcara from "../../../components/management/acara/main-content";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import ExtraHeaderAcara from "../../../components/management/acara/extra-header";
import DetailContentAcara from "../../../components/management/acara/detail-content";

const ManagementAcara = () => {
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
          <MainContentAcara profileDataLevel={"test"} />
        </section>
      )}
      childSecondary={() => (
        <div>
          <DetailContentAcara />
        </div>
      )}
    />
  );
};

export default ManagementAcara;
