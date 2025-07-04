import React from "react";
import { Form, Input } from "antd";
import "./index.css";

const InputText = ({
  size,
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
  type = "text",
  readOnly,
  onChange = () => {},
}) => {
  const rulesValidation = [
    type === "email" && {
      type: "email",
      message: "masukan email yang valid",
    },
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
      <Input
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

        // addonBefore={addonBefore}
        // variant={variant || "filled"}
      />
    </Form.Item>
  );
};

export default InputText;
