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

export const ContextAcara = createContext();

const ManagementAcara = () => {
  const [formAcara] = Form.useForm();

  const [modalAcara, setModalAcara] = useState(false);

  const openModalAcara = () => {
    setModalAcara(true);
  };

  const closeFormAcara = () => {
    setModalAcara(false);
    formAcara.resetFields();
  };

  const [selectedAcara, setSelectedAcara] = useState({});

  const [filterCategory, setFilterCategory] = useState(-1);
  const [filterStatus, setFilterStatus] = useState(-1);

  const { kategoriList } = useSelector((state) => state.kategori);

  const kategoriOptions = useMemo(() => {
    return kategoriList?.map((data) => ({
      label: data?.nama_kategori,
      value: data?.id,
    }));
  }, [kategoriList]);

  const dispatch = useDispatch();

  const getDatasKategori = useCallback(() => {
    dispatch(getKategoriAction()).catch(() => {});
  }, []);

  useEffect(() => {
    getDatasKategori();
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
        modalAcara,
        setModalAcara,
        openModalAcara,
        closeFormAcara,
      }}
    >
      <LayoutCanvas
        extraMainActionHeader={() => (
          <ExtraHeader
            placeholder="Cari berdasarkan acara"
            //   onClickBtnAdd={openModalCreate}
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
