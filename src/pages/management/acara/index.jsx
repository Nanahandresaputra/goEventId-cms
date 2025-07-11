import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import MainContentAcara from "../../../components/management/acara/main-content";
import LayoutCanvas from "../../../components/atoms/layout-canvas";
import DetailContentAcara from "../../../components/management/acara/detail-content";
import HeaderFilterAcara from "../../../components/management/acara/header-filter-acara";
import { useDispatch, useSelector } from "react-redux";
import { getKategoriAction } from "../../../store/features/management/kategori";
import ExtraHeader from "../../../components/atoms/other/extra-header";
import { Form } from "antd";
import { getPenyelenggaraAction } from "../../../store/features/management/penyelenggara";
import {
  getKabupateKotaAction,
  getProvinsiAction,
} from "../../../store/features/management/regional";
import { createAcaraAction } from "../../../store/features/management/acara";

export const ContextAcara = createContext({});

const ManagementAcara = () => {
  const [formAcara] = Form.useForm();
  const [formTicket] = Form.useForm();

  const [modalAcara, setModalAcara] = useState(false);
  const [modalTicket, setModalTicket] = useState(false);

  const openModalAcara = () => {
    setModalAcara(true);
  };

  const closeModalAcara = () => {
    setModalAcara(false);
    formAcara.resetFields();
  };

  const openModalTicket = () => {
    setModalTicket(true);
  };

  const closeModalTicket = () => {
    setModalTicket(false);
    formTicket.resetFields();
  };

  const [selectedAcara, setSelectedAcara] = useState({});

  const [filterCategory, setFilterCategory] = useState(-1);
  const [filterStatus, setFilterStatus] = useState(-1);

  const { kategoriList } = useSelector((state) => state.kategori);
  const { penyelenggaraList } = useSelector((state) => state.penyelenggara);
  const { provinsiList, kabupatenkotaList } = useSelector(
    (state) => state.regional
  );

  const kategoriOptions = useMemo(() => {
    return kategoriList?.map((data) => ({
      label: data?.nama_kategori,
      value: data?.id,
    }));
  }, [kategoriList]);

  const penyelenggaraOptions = useMemo(() => {
    return penyelenggaraList?.map((data) => ({
      label: data?.nama,
      value: data?.id,
    }));
  }, [penyelenggaraList]);

  const provinsiOptions = useMemo(() => {
    return provinsiList?.map((data) => ({
      label: data?.nama,
      value: data?.id,
    }));
  }, [provinsiList]);

  const kabupatenkotaOptions = useMemo(() => {
    return kabupatenkotaList?.map((data) => ({
      label: data?.nama,
      value: data?.id,
    }));
  }, [kabupatenkotaList]);

  const defaultValueAcara = {
    operation: "c",
    nama_acara: null,
    waktu_acara: null,
    kategori_id: null,
    user_id_penyelenggara: null,
    deskripsi: null,
    provinsi_id: null,
    kabupaten_kota_id: null,
    alamat: null,
    banner_img: null,
    map_tiket_img: null,
  };

  const dispatch = useDispatch();

  const getDatasKategori = useCallback(() => {
    dispatch(getKategoriAction()).catch(() => {});
  }, []);

  const getDatasPenyelenggara = useCallback(() => {
    dispatch(getPenyelenggaraAction()).catch(() => {});
  }, []);

  const getDatasProvinsi = useCallback(() => {
    dispatch(getProvinsiAction()).catch(() => {});
  }, []);

  const getDatasKabupatenKota = useCallback(({ provinsiId }) => {
    dispatch(getKabupateKotaAction({ provinsiId })).catch(() => {});
  }, []);

  const createDataAcara = useCallback((body) => {
    dispatch(createAcaraAction({ body }))
      .then(() => {
        setModalAcara(false);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getDatasProvinsi();
    getDatasKategori();
    getDatasPenyelenggara();
  }, []);

  return (
    <ContextAcara.Provider
      value={{
        selectedAcara,
        setSelectedAcara,
        filterCategory,
        setFilterCategory,
        filterStatus,
        setFilterStatus,
        kategoriOptions,
        penyelenggaraOptions,
        modalAcara,
        setModalAcara,
        openModalAcara,
        closeModalAcara,
        formAcara,
        defaultValueAcara,
        getDatasKabupatenKota,
        provinsiOptions,
        kabupatenkotaOptions,
        modalTicket,
        setModalTicket,
        openModalTicket,
        closeModalTicket,
        formTicket,
        createDataAcara,
      }}
    >
      <LayoutCanvas
        extraMainActionHeader={() => (
          <ExtraHeader
            placeholder="Cari berdasarkan acara"
            //   onClickBtnAdd={openModalCreate}
            onClickBtn={openModalAcara}
          />
        )}
        childMain={() => (
          <section className="space-y-4 h-3/4 ">
            <HeaderFilterAcara
              selectCompKategori={{
                onChange: (e) => {
                  setFilterCategory(e);
                },
              }}
              selectCompStatus={{
                onChange: (e) => {
                  setFilterStatus(e);
                },
              }}
            />
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
