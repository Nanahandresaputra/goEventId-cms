import { Form, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import "./index.css";

/**
  Props
 **   disabled={disabled} => boolean
 **   placeholder={placeholder} => default ["Start Date", End Date]
 **   inputReadOnly
 **   variant={variant || "filled"} => {"filled", "filled", "borderless"}
 **   onChange => function
 **   ...rest
 */
export default function RangeDateComp({
  placeholder,
  disabled,
  onChange = () => {},
  name,
  label,
  size,
  inputReadOnly,
  rules = [],
  required,
  className,
  dark,
  gray,
}) {
  //   const { placeholder, disabled, inputReadOnly, variant, onChange, ...rest } =
  //     props;

  /* Store Data */
  /* ----- */

  /* Hooks */
  /* ----- */

  /* Constant */
  /* ----- */

  /* State */
  /* ----- */

  /* Function */
  // function disabledDate(current) {
  //   return current && current.valueOf() > Date.now();
  // }

  /* componentDidMount and componentDidUpdate */
  /* ----- */

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        ...rules,
        required && {
          required: true,
          message: placeholder ? `${placeholder}` : `Masukan ${name}`,
        },
      ]}
      className={`${className}`}
    >
      <RangePicker
        size={size}
        placeholder={placeholder || ["Start Date", "End Date"]}
        placement="bottomLeft"
        inputReadOnly={inputReadOnly}
        open={inputReadOnly ? false : undefined}
        // disabledDate={disabledDate}
        disabled={disabled}
        className={`w-full ${
          dark &&
          "bg-[#0000004D] border-[#FFFFFF73] shadow-none text-white input-pwd"
        } ${
          gray &&
          "bg-[#454239] border-[#FFFFFF73] shadow-none text-white input-pwd"
        }`}
        onChange={onChange}
      />
    </Form.Item>
  );
}
