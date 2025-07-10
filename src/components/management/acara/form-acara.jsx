import { Form, Modal, Upload } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ContextAcara } from "../../../pages/management/acara";
import InputText from "../../atoms/form/inputText";
import SelectComp from "../../atoms/form/selectComp";
import SelectDateComp from "../../atoms/form/date-picker";
import Editor from "react-simple-wysiwyg";
import {
  beforeUpload,
  getBase64,
  handleImageUpload,
} from "../../../helpers/upload-img";
import { BiCameraHome } from "react-icons/bi";
import Dragger from "antd/es/upload/Dragger";
import PlaceholderImgUpload from "../../atoms/other/placeholder-img-upload";
import { formatDate } from "../../../helpers/date-format";

const FormAcara = () => {
  const {
    modalAcara,
    closeModalAcara,
    formAcara,
    defaultValueAcara,
    kategoriOptions,
    penyelenggaraOptions,
    getDatasKabupatenKota,
    provinsiOptions,
    kabupatenkotaOptions,
  } = useContext(ContextAcara);
  const [bannerData, setBannerData] = useState(null);
  const [mapTiketData, setMapTiketData] = useState(null);

  const handleChangeBanner = (info) => {
    handleImageUpload({ file: info?.fileList?.[0]?.originFileObj })
      .then((res) => {
        console.log("trigger base64");
        getBase64({
          file: res,
          callback: (result) => {
            setBannerData(result);
          },
        });
      })
      .catch((err) => console.log(err));
  };
  const handleChangeMapTiket = (info) => {
    handleImageUpload({ file: info?.fileList?.[0]?.originFileObj })
      .then((res) => {
        console.log("trigger base64");
        getBase64({
          file: res,
          callback: (result) => {
            setMapTiketData(result);
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitForm = () => {
    formAcara.submit();
    formAcara
      .validateFields()
      .then((res) => {
        console.log("res -->", {
          ...defaultValueAcara,
          ...res,
          // 2025-04-20 20:30:00.000
          waktu_acara: formatDate({
            time: res.waktu_acara,
            formatDate: "YYYY-MM-DD HH:mm:ss.sss",
          }),
          banner_img: bannerData,
          map_tiket_img: mapTiketData,
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (kabupatenkotaOptions?.length > 0) {
      formAcara.setFieldsValue({
        kabupaten_kota_id: kabupatenkotaOptions[0]?.value,
      });
    }
  }, [kabupatenkotaOptions]);
  return (
    <Modal
      width={"35%"}
      title="Form TEmp title"
      open={modalAcara}
      onOk={handleSubmitForm}
      onCancel={closeModalAcara}
      confirmLoading={false} //temp
      className="max-h-[85vh] overflow-y-auto"
    >
      <Form
        layout="vertical"
        form={formAcara}
        autoComplete="off"
        className="grid grid-cols-2 gap-x-5"
        validateTrigger="onSubmit"
      >
        <Form.Item
          className={"col-span-2"}
          rules={[
            {
              required: true,
              message: "Gambar banner belum di upload!",
            },
          ]}
        >
          <Upload
            maxCount={1}
            name="banner"
            listType="picture-card"
            beforeUpload={beforeUpload}
            showUploadList={false}
            // onPreview={handlePreview}
            onChange={handleChangeBanner}
            style={{ width: "100%", height: 150 }}
            // capture="environment"
          >
            {bannerData === null ? (
              <PlaceholderImgUpload text="Upload Banner Acara" />
            ) : (
              <img
                alt="banner"
                className="w-full h-full object-fill rounded-lg"
                src={bannerData}
              />
            )}
          </Upload>
        </Form.Item>
        <InputText
          name={"nama_acara"}
          required
          label={"Nama Acara"}
          className={"col-span-2"}
          placeholder={"Masukan Nama Acara"}
        />
        <SelectComp
          name={"kategori_id"}
          required
          label={"Kategori"}
          options={kategoriOptions}
          className={"col-span-1"}
          placeholder={"Pilih Kategori"}
        />
        <SelectDateComp
          name={"waktu_acara"}
          required
          label={"Tanggal"}
          showTime
          className={"col-span-1"}
          placeholder={"Pilih Tanggal"}
        />
        <SelectComp
          name={"user_id_penyelenggara"}
          required
          label={"Penyelenggara"}
          options={penyelenggaraOptions}
          className={"col-span-2"}
          placeholder={"Pilih Penyelenggara"}
        />
        <SelectComp
          name={"provinsi_id"}
          required
          label={"Provinsi"}
          options={provinsiOptions}
          className={"col-span-1"}
          placeholder={"Pilih Provinsi"}
          onChange={(e) => getDatasKabupatenKota({ provinsiId: e })}
        />
        <SelectComp
          name={"kabupaten_kota_id"}
          required
          label={"Kabupaten/Kota"}
          options={kabupatenkotaOptions}
          className={"col-span-1"}
          placeholder={"Pilih Kabupaten/Kota"}
        />
        <InputText
          name={"alamat"}
          required
          label={"Alamat"}
          className={"col-span-2"}
          placeholder={"Masukan Alamat Lengkap"}
        />
        <Form.Item
          name={"deskripsi"}
          label="Deskripsi"
          className={"col-span-2"}
        >
          <Editor
          //  value={html} onChange={onChange}
          />
        </Form.Item>
        <Form.Item className={"col-span-2"}>
          <Upload
            style={{ height: 180, width: 180 }}
            maxCount={1}
            name="map_tiket"
            listType="picture-card"
            beforeUpload={beforeUpload}
            showUploadList={false}
            // onPreview={handlePreview}
            onChange={handleChangeMapTiket}
            // capture="environment"
          >
            {mapTiketData === null ? (
              <PlaceholderImgUpload text="Upload Map Tiket" />
            ) : (
              <img
                alt="banner"
                className="w-full h-full object-fill rounded-lg"
                src={mapTiketData}
              />
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormAcara;
