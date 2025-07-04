import { Form, Checkbox } from "antd";

export default function CheckboxComp({
  name,
  placeholder,
  className,
  checked,
  disabled,
  onChange = () => {},
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
  /* ----- */

  /* componentDidMount and componentDidUpdate */
  /* ----- */

  return (
    <Form.Item name={name} className={className}>
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      >
        {placeholder}
      </Checkbox>
    </Form.Item>
  );
}
