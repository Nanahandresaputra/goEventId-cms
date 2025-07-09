import React from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";

import MainContentUsers from "../../../components/management/users/main-content";
import ExtraHeader from "../../../components/atoms/other/extra-header";

const ManagementUsers = () => {
  return (
    <LayoutCanvas
      extraMainActionHeader={() => (
        <ExtraHeader
          onChangeSearch={() => {}}
          //   onClickBtnAdd={openModalCreate}
          //   onResultXls={handleXlsx}
        />
      )}
      childMain={() => (
        <section className="space-y-4 h-3/4 ">
          <MainContentUsers />
        </section>
      )}
    />
  );
};

export default ManagementUsers;
