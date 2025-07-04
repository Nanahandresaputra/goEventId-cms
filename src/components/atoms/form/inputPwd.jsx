import React from "react";
import { Button, Form, Input, Space } from "antd";
import "./index.css";

//  <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Masukkan password baru",
//             },
//             {
//               min: 8,
//               message: "Password harus memiliki setidaknya 8 karakter",
//             },
//           ]}
//         >
//           {/* <label className="text-white">Password</label> */}
//           <Input.Password
//             placeholder="Password baru"
//             className="w-full bg-[#0000004D] border-[#FFFFFF73] shadow-none text-white input-pwd"
//             size="large"
//           />
//         </Form.Item>

const InputPwd = ({
  size,
  change,
  isChange,
  setIsChange,
  // form,
  disabled,
  prefix,
  placeholder,
  name,
  label,
  className,
  dark,
  rules = [],
  advanceRules,
  required,
  gray,
}) => {
  const advance = [
    { min: 8, message: "Password harus memiliki setidaknya 8 karakter." },
    { max: 30, message: "Password maksimal 30 karakter." },
    // () => ({
    //   validator(_, value) {
    //     let errors = [];

    //     if (!/[a-z]/.test(value)) {
    //       errors.push("Lower Case [a - z]");
    //     }

    //     if (!/[A-Z]/.test(value)) {
    //       errors.push("Upper Case [A - Z]");
    //     }

    //     if (!/[0-9 ]/.test(value)) {
    //       errors.push("Number [0 - 9]");
    //     }

    //     if (!/[^A-Z a-z0-9]/.test(value)) {
    //       errors.push("Symbol [!@#$%^&*]!");
    //     }

    //     if (errors.length < 1) {
    //       return Promise.resolve();
    //     }

    //     return Promise.reject(
    //       new Error("Password must containt " + errors.join(", "))
    //     );
    //   },
    // }),
    ...rules,
  ];
  const generateComp = () => {
    let comp = <div></div>;

    if (change) {
      if (isChange) {
        comp = (
          <Space.Compact block>
            <Input
              size={size}
              disabled={disabled}
              placeholder={placeholder}
              prefix={prefix}
              className={`${
                dark &&
                "bg-[#0000004D] border-[#FFFFFF73] shadow-none text-white input-pwd"
              } ${
                gray &&
                "bg-[#454239] border-[#FFFFFF73] shadow-none text-white input-pwd"
              } ${className}`}
            />
            <Button
              onClick={() => {
                setIsChange(false);
                // form.setFieldsValue({ password: "***oldpassword***" });
              }}
              size="large"
            >
              Cancel
            </Button>
          </Space.Compact>
        );
      } else {
        comp = (
          <Button
            disabled={disabled}
            type="primary"
            onClick={() => setIsChange(true)}
          >
            Ubah Kata Sandi
          </Button>
        );
      }
    } else {
      comp = (
        <Input.Password
          size={size}
          prefix={prefix}
          placeholder={placeholder}
          className={`${
            dark &&
            "bg-[#0000004D] border-[#FFFFFF73] shadow-none text-white input-pwd"
          } ${
            gray &&
            "bg-[#454239] border-[#FFFFFF73] shadow-none text-white input-pwd"
          } ${className}`}
        />
      );
    }

    return comp;
  };

  /* componentDidMount and componentDidUpdate */
  /* ----- */

  return (
    <Form.Item
      name={name}
      label={label}
      rules={
        advanceRules
          ? advance
          : [
              ...rules,
              required && {
                required: true,
                message: placeholder ? `${placeholder}` : `Masukan ${name}`,
              },
            ]
      }
    >
      {generateComp()}
    </Form.Item>
  );
};

export default InputPwd;
