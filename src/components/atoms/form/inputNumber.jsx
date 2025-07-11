import React from "react";
import { Form, Input, InputNumber } from "antd";
import "./index.css";

const InputNumComp = ({
  size = "middle",
  name,
  label,
  placeholder,
  disabled,
  prefix,
  rules = [],
  required,
  dark,
  gray,
  className,
  readOnly,
  onChange = () => {},
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
      <InputNumber
        style={{ width: "100%" }}
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        prefix={prefix}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${
          dark &&
          "bg-[#0000004D] border-[#FFFFFF73] shadow-none text-white input-pwd"
        } ${
          gray &&
          "bg-[#454239] border-[#FFFFFF73] shadow-none text-white input-pwd"
        }`}
        formatter={(value) =>
          value != null ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
        }
        parser={(value) =>
          value
            ? value.replace(/[^0-9]/g, "") // removes everything that's not a digit
            : ""
        }
        // addonBefore={addonBefore}
        // variant={variant || "filled"}
      />
    </Form.Item>
  );
};

{
  /* <InputNumber
  style={{ ...style }}
  size={size}
  disabled={disabled}
  placeholder={placeholder}
  prefix={prefix}
  addonBefore={addonBefore}
  variant={variant || "filled"}
  className="w-full"
  {...(type !== undefined ? { type } : {})}
  {...(min !== undefined ? { min } : {})}
  {...(formatter !== undefined ? { formatter } : {})}
  {...(parser !== undefined ? { parser } : {})}
  {...(step !== undefined ? { step } : {})}
  {...(onStep !== undefined ? { onStep } : {})}
  {...(onInput !== undefined ? { onInput } : {})}
/>; */
}
export default InputNumComp;
