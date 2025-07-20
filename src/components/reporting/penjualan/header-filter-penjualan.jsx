import { MdEvent } from "react-icons/md";
import RangeDateComp from "../../atoms/form/range-picker";
import SelectComp from "../../atoms/form/selectComp";
import { BiBuildings } from "react-icons/bi";
import { parseJwt } from "../../../helpers/decode-token";
import { role_user } from "../../../helpers/status-data";

const HeaderFilterPenjualan = ({
  rangePickerCompPropsPenjualan,
  selectCompPenyelenggara,
  extraContent = () => {},
}) => {
  const userData = localStorage?.token ? parseJwt(localStorage.token) : {};

  const rangePickerPropsPenjualan = {
    name: "range",
    label: false,
    className: "w-full !my-0 !ml-0 !mr-3",
    onChange: () => {},
    ...rangePickerCompPropsPenjualan,
  };

  const selectPropsPenyelenggara = {
    name: "penyelenggara",
    label: false,
    placeholder: "Pilih Penyelenggara",
    className: "w-full !my-0 !ml-0 !mr-3",
    options: [],
    suffixIcon: <BiBuildings className="text-white opacity-40 text-lg" />,
    defaultValue: false,
    onChange: () => {},
    ...selectCompPenyelenggara,
  };

  return (
    <section className="w-full p-3 bg-[#225246] rounded-lg flex items-center justify-between space-x-3">
      <div className="flex items-center justify-between w-full">
        {userData?.role === role_user.admin.value && (
          <SelectComp
            dark
            label={selectPropsPenyelenggara.label}
            name={selectPropsPenyelenggara.name}
            // defaultValue={selectPropsPenyelenggara.defaultValue}
            placeholder={selectPropsPenyelenggara.placeholder}
            className={selectPropsPenyelenggara.className}
            options={selectPropsPenyelenggara.options}
            suffixIcon={selectPropsPenyelenggara.suffixIcon}
            onChange={selectPropsPenyelenggara.onChange}
          />
        )}
        <RangeDateComp
          name={rangePickerPropsPenjualan.name}
          label={rangePickerPropsPenjualan.label}
          className={rangePickerPropsPenjualan.className}
          onChange={rangePickerPropsPenjualan.onChange}
          dark
        />
      </div>
      <div className="w-6/12 flex justify-end">{extraContent()}</div>
    </section>
  );
};

export default HeaderFilterPenjualan;
