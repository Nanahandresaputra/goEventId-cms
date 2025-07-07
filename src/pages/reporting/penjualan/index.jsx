import LayoutCanvas from "../../../components/atoms/layout-canvas";
import DetailContentPenjualan from "../../../components/reporting/penjualan/detail-content";
import HeaderFilterPenjualan from "../../../components/reporting/penjualan/header-filter-penjualan";
import MainContentPenjualan from "../../../components/reporting/penjualan/main-content";

const ReportingPenjualan = () => {
  return (
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
  );
};

export default ReportingPenjualan;
