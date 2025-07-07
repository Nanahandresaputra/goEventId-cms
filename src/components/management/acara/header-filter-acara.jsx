import { TbCategoryFilled } from "react-icons/tb";
import SelectComp from "../../atoms/form/selectComp";
import { GrStatusCritical } from "react-icons/gr";

const HeaderFilterAcara = ({
  selectCompKategori,
  selectCompStatus,

  extraContent = () => {},
}) => {
  const selectPropsKategori = {
    name: "kategori",
    label: false,
    placeholder: "Pilih Kategori",
    className: "w-full !my-0 !ml-0 !mr-3",
    options: [],
    suffixIcon: <TbCategoryFilled className="text-white opacity-40 text-lg" />,
    defaultValue: false,
    onChange: () => {},
    ...selectCompKategori,
  };
  const selectPropsStatus = {
    name: "status",
    label: false,
    placeholder: "Pilih Status",
    className: "w-full !my-0 !ml-0 !mr-3",
    options: [],
    suffixIcon: <GrStatusCritical className="text-white opacity-40 text-lg" />,
    defaultValue: false,
    onChange: () => {},
    ...selectCompStatus,
  };

  return (
    <section className="w-full p-3 bg-[#225246] rounded-lg flex items-center justify-between space-x-3">
      <div className="flex items-center justify-between w-full">
        <SelectComp
          dark
          label={selectPropsKategori.label}
          name={selectPropsKategori.name}
          // defaultValue={selectPropsKategori.defaultValue}
          placeholder={selectPropsKategori.placeholder}
          className={selectPropsKategori.className}
          options={selectPropsKategori.options}
          suffixIcon={selectPropsKategori.suffixIcon}
          onChange={selectPropsKategori.onChange}
        />

        <SelectComp
          dark
          label={selectPropsStatus.label}
          name={selectPropsStatus.name}
          // defaultValue={selectPropsKategori.defaultValue}
          placeholder={selectPropsStatus.placeholder}
          className={selectPropsStatus.className}
          options={selectPropsStatus.options}
          suffixIcon={selectPropsStatus.suffixIcon}
          onChange={selectPropsStatus.onChange}
        />
      </div>
      <div className="w-6/12 flex justify-end">{extraContent()}</div>
    </section>
  );
};

export default HeaderFilterAcara;
