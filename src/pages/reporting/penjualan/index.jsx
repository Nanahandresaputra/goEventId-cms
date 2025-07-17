import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import DetailContentPenjualan from "../../../components/reporting/penjualan/detail-content";
import HeaderFilterPenjualan from "../../../components/reporting/penjualan/header-filter-penjualan";
import MainContentPenjualan from "../../../components/reporting/penjualan/main-content";
import { useDispatch, useSelector } from "react-redux";
import { getPenyelenggaraAction } from "../../../store/features/management/penyelenggara";
import { formatDate } from "../../../helpers/date-format";

export const ContextReportingPenjualan = createContext();

const ReportingPenjualan = () => {
  const [detailPenjualan, setDetailPenjualan] = useState({});

  const [filterPenyelenggara, setFilterPenyelenggara] = useState(-1);
  const [filterDateRange, setFilterDateRange] = useState({
    startDate: -1,
    endDate: -1,
  });

  const { penyelenggaraList } = useSelector((state) => state.penyelenggara);

  const penyelenggaraOptions = useMemo(() => {
    return penyelenggaraList?.map((data) => ({
      label: data?.nama,
      value: data?.id,
    }));
  }, [penyelenggaraList]);

  const dispatch = useDispatch();
  const getPenyelenggara = useCallback(() => {
    dispatch(getPenyelenggaraAction()).catch(() => {});
  }, []);

  useEffect(() => {
    getPenyelenggara();
  }, []);

  return (
    <ContextReportingPenjualan.Provider
      value={{
        detailPenjualan,
        setDetailPenjualan,
        penyelenggaraOptions,
        filterDateRange,
        filterPenyelenggara,
      }}
    >
      <LayoutCanvas
        childMain={() => (
          <section className="space-y-4 h-3/4 ">
            <HeaderFilterPenjualan
              selectCompPenyelenggara={{
                options: [
                  {
                    label: "Semua",
                    value: -1,
                  },
                  ...penyelenggaraOptions,
                ],
                onChange: (e) => {
                  setFilterPenyelenggara(e);
                },
              }}
              rangePickerCompPropsPenjualan={{
                onChange: (e) => {
                  setFilterDateRange({
                    startDate: new Date(
                      formatDate({ time: e[0], formatDate: "YYYY-MM-DD" })
                    ).getTime(),
                    endDate: new Date(
                      formatDate({ time: e[1], formatDate: "YYYY-MM-DD" })
                    ).getTime(),
                  });
                },
              }}
            />
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
