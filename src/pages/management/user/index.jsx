import React from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import ExtraHeaderAcara from "../../../components/management/acara/extra-header";

import MainContentUsers from "../../../components/management/users/main-content";

const ManagementUsers = () => {
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
          <MainContentUsers profileDataLevel={"test"} />
        </section>
      )}
    />
  );
};

export default ManagementUsers;
