import { Form, Select } from "antd";
import React from "react";
import "./index.css";

const SelectComp = ({
  name,
  label,
  size,
  defaultValue,
  placeholder,
  className,
  disabled,
  suffixIcon,
  onChange,
  // loading,
  options = [],
  rules = [],
  required = [],
  dark,
  gray,
}) => {
  const rulesValidation = [
    required && {
      required: true,
      message: placeholder ? `${placeholder}` : `Masukan ${name}`,
    },
    ...rules,
  ];
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rulesValidation}
      className={`${className}`}
    >
      <Select
        size={size}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        showSearch
        className={`${
          dark && "select-bg-dark select-holder focus:border-[#FFFFFF73] "
        } ${gray && "select-bg-gray select-holder focus:border-[#FFFFFF73]"} `}
        suffixIcon={suffixIcon}
        optionFilterProp="children"
        onChange={onChange}
        // filterOption={(input, option) => {
        //   if (option?.children?.props?.temp) {
        //     return option?.children?.props?.temp
        //       .toLowerCase()
        //       .includes(input.toLowerCase());
        //   } else {
        //     return option.children.toLowerCase().includes(input.toLowerCase());
        //   }
        // }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
      />
    </Form.Item>
  );
};

export default SelectComp;
