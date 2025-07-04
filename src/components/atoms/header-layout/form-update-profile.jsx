import { Form } from "antd";
import InputText from "../form/inputText";
import InputPwd from "../form/inputPwd";

const FormModalProfile = ({ form, isChangePass, setIsChangePass }) => {
  const newPw = Form.useWatch("newPassword", form);

  const validatorPw = [
    {
      validator: (_, value) => {
        if (newPw === value) {
          return Promise.resolve();
        } else {
          return Promise.reject("Password yang anda masukan tidak sesuai!");
        }
      },
    },
  ];
  return (
    <Form form={form} autoComplete="off">
      <InputText
        name={"fullname"}
        required
        placeholder={"Masukan Nama Lengkap"}
        className={"w-full"}
      />

      <InputText
        name={"email"}
        type="email"
        placeholder={"Masukan Email"}
        className={"w-full"}
      />

      <InputPwd
        name={"newPassword"}
        required={isChangePass}
        placeholder={"Masukan kata Sandi"}
        className={"w-full"}
        change
        isChange={isChangePass}
        setIsChange={setIsChangePass}
        form={form}
      />

      {isChangePass && (
        <InputPwd
          name={"password"}
          rules={validatorPw}
          required={isChangePass}
          placeholder={"Kata Sandi Harus Sama"}
          className={"w-full"}
        />
      )}
      {isChangePass && (
        <Form.Item>
          <p>
            <span className="text-[#F26D1B]">*</span>
            <span className="text-[#00000066] font-semibold">
              Anda akan login ulang setelah kata sandi diubah!
            </span>
          </p>
        </Form.Item>
      )}
    </Form>
  );
};

export default FormModalProfile;
