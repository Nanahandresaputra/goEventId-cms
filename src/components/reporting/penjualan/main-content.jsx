import { Button, Table, Tag } from "antd";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { getColumnWidth } from "../../../helpers/table-column-width";
import { useDispatch, useSelector } from "react-redux";
import { getReportingPenjualanAction } from "../../../store/features/reporting/penjualan";
import { formatDate } from "../../../helpers/date-format";
import StatusAcaraTag from "../../atoms/generate-tag/status-acara";
import { formatter } from "../../../helpers/formatter";
import { ContextReportingPenjualan } from "../../../pages/reporting/penjualan";
import { ContextApp } from "../../../layout";

const MainContentPenjualan = () => {
  const { penjualanList, isLoadingGet } = useSelector(
    (state) => state.penjualan
  );
  const { setDetailPenjualan, filterDateRange, filterPenyelenggara } =
    useContext(ContextReportingPenjualan);

  const { dataIndex, setDataIndex } = useContext(ContextApp);

  const dataSource = useMemo(() => {
    // if (penjualanList?.length > 0) {
    //   setDetailPenjualan({
    //     ...penjualanList[0]?.details,
    //     nama_acara: penjualanList[0].nama_acara,
    //   });
    // }

    const filterData = penjualanList
      .filter((data) =>
        filterDateRange.startDate === -1 && filterDateRange.endDate === -1
          ? data
          : new Date(
              formatDate({ time: data?.waktu_acara, formatDate: "YYYY-MM-DD" })
            ).getTime() >= filterDateRange.startDate &&
            new Date(
              formatDate({ time: data?.waktu_acara, formatDate: "YYYY-MM-DD" })
            ).getTime() <= filterDateRange.endDate
      )
      .filter((data) =>
        filterPenyelenggara === -1
          ? data
          : data?.details?.penyelenggara_id === filterPenyelenggara
      );

    return filterData;
  }, [penjualanList, filterDateRange, filterPenyelenggara]);

  useEffect(() => {
    if (dataSource?.length > 0) {
      setDetailPenjualan(dataSource[dataIndex]);
    } else {
      setDetailPenjualan({});
    }
  }, [dataSource, dataIndex]);

  const columns = [
    {
      title: "Acara",
      dataIndex: "nama_acara",
      key: "nama_acara",
    },
    {
      title: "Tanggal",
      dataIndex: "waktu_acara",
      key: "waktu_acara",
      render: (row) => formatDate({ time: row }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (row) => <StatusAcaraTag text={row} />,
    },
    {
      title: "Total Tiket Terjual",
      dataIndex: "totalTiketTerjual",
      key: "totalTiketTerjual",
      align: "right",
    },

    {
      title: "Total Pendapatan",
      dataIndex: "totalPenjualan",
      key: "totalPenjualan",
      align: "right",
      fixed: "right",
      render: (row) => `Rp ${formatter(row)}`,
    },
  ].map((clm) => ({
    ...clm,
    title: <span style={{ whiteSpace: "nowrap" }}>{clm.title}</span>,
    className: "whitespace-nowrap",
    width: getColumnWidth(clm?.dataIndex, dataSource, clm?.title),
  }));

  const dispatch = useDispatch();

  const getDatas = useCallback(() => {
    dispatch(getReportingPenjualanAction()).catch(() => {});
  }, []);

  useEffect(() => {
    getDatas();
  }, []);

  const footerShow = () => {
    const total = dataSource.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalPenjualan,
      0
    );
    // const qty = dataSource.reduce(
    //   (accumulator, currentValue) =>
    //     accumulator + currentValue.totalTiketTerjual,
    //   0
    // );

    return (
      <div className="flex items-center justify-between">
        <p className="font-semibold col-span-4">
          Grand Total Tiktet Terjual & Pendapatan
        </p>
        {/* <p className="font-semibold col-span-1 text-end">{qty}</p> */}
        <p className="font-semibold col-span-1 text-end">
          Rp {formatter(total)}
        </p>
      </div>
    );
  };

  return (
    <section>
      <Table
        columns={columns}
        loading={isLoadingGet}
        size="large"
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [5, 10, 15, 20, 30, 50, 100],
          showSizeChanger: true,
        }}
        scroll={{ y: "calc(52vh - 4em)", x: "max-content" }}
        footer={dataSource.length > 0 && footerShow}
        onRow={(record) => {
          return {
            onClick: () => {
              setDataIndex(
                dataSource?.findIndex((data) => data?.id === record?.id)
              );
            }, // click row
          };
        }}
      />
    </section>
  );
};

export default MainContentPenjualan;
