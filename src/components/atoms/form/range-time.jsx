import { TimePicker, Form } from "antd";
const { RangePicker } = TimePicker;

/**
  Props
 **   disabled={disabled} => boolean
 **   placeholder={placeholder} => default ["Start Date", End Date]
 **   inputReadOnly
 **   variant={variant || "filled"} => {"filled", "filled", "borderless"}
 **   onChange => function
 **   ...rest
 */
export default function RangeTimeComp({
  name,
  disabled,
  inputReadOnly,
  onChange = () => {},
  className,
  placeholder,
  rules = [],
  required,
}) {
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
      className={className}
      rules={[
        ...rules,
        required && {
          required: true,
          message: "Pilih waktu!",
        },
      ]}
    >
      <RangePicker
        order={false}
        placeholder={placeholder || ["Start Time", "End Time"]}
        placement="bottomLeft"
        inputReadOnly={inputReadOnly}
        open={inputReadOnly ? false : undefined}
        // disabledDate={disabledDate}
        disabled={disabled}
        className="w-full time-picker"
        onChange={onChange}
      />
    </Form.Item>
  );
}
