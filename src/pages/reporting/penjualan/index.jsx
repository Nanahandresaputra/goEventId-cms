import { createContext, useState } from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import DetailContentPenjualan from "../../../components/reporting/penjualan/detail-content";
import HeaderFilterPenjualan from "../../../components/reporting/penjualan/header-filter-penjualan";
import MainContentPenjualan from "../../../components/reporting/penjualan/main-content";

export const ContextReportingPenjualan = createContext();

const ReportingPenjualan = () => {
  const [detailPenjualan, setDetailPenjualan] = useState({});
  return (
    <ContextReportingPenjualan.Provider
      value={{ detailPenjualan, setDetailPenjualan }}
    >
      <LayoutCanvas
        childMain={() => (
          <section className="space-y-4 h-3/4 ">
            <HeaderFilterPenjualan />
            <MainContentPenjualan profileDataLevel={"test"} />
          </section>
        )}
        childSecondary={() => (
          <div>
            <DetailContentPenjualan />
          </div>
        )}
      />
    </ContextReportingPenjualan.Provider>
  );
};

export default ReportingPenjualan;
