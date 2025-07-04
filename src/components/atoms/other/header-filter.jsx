import InputText from "../form/inputText";
import RangeDateComp from "../form/range-picker";
import SelectComp from "../form/selectComp";

const HeaderFilter = ({
  selectCompProps,
  inputCompProps,
  rangePickerCompProps,
  extraContent = () => {},
}) => {
  const selectProps = {
    name: "select",
    label: false,
    placeholder: "select",
    className: "w-3/12 m-0",
    options: [],
    suffixIcon: false,
    defaultValue: false,
    onChange: () => {},
    ...selectCompProps,
  };

  const inputProps = {
    name: "input",
    label: false,
    placeholder: "input",
    className: "w-3/12 m-0",
    onChange: () => {},
    ...inputCompProps,
  };

  const rangePickerProps = {
    name: "range",
    label: false,
    className: "w-3/12 m-0",
    onChange: () => {},
    ...rangePickerCompProps,
  };

  return (
    <section className="w-full p-3 bg-[#454239] rounded-lg flex items-center justify-between space-x-3">
      <div className="flex items-center space-x-3 w-full">
        {selectCompProps && (
          <SelectComp
            dark
            label={selectProps.label}
            name={selectProps.name}
            // defaultValue={selectProps.defaultValue}
            placeholder={selectProps.placeholder}
            className={selectProps.className}
            options={selectProps.options}
            suffixIcon={selectProps.suffixIcon}
            onChange={selectProps.onChange}
          />
        )}

        {rangePickerCompProps && (
          <RangeDateComp
            name={rangePickerProps.name}
            label={rangePickerProps.label}
            className={rangePickerProps.className}
            onChange={rangePickerProps.onChange}
            dark
          />
        )}

        {inputCompProps && (
          <InputText
            size={"large"}
            name={inputProps.name}
            placeholder={inputProps.placeholder}
            onChange={inputProps.onChange}
          />
        )}
      </div>
      <div className="w-6/12 flex justify-end">{extraContent()}</div>
    </section>
  );
};

export default HeaderFilter;
