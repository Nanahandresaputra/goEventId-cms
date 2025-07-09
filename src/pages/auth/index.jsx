import { Button, Form } from "antd";
import InputPwd from "../../components/atoms/form/inputPwd";
import InputText from "../../components/atoms/form/inputText";
import { goeBg, logo } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/features/auth/auth";

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const [formLogin] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginDesktop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    formLogin
      .validateFields()
      .then((body) => {
        dispatch(loginAction({ body }))
          .then((res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              navigate("/desktop/manajemen-acara");
            }
            if (res?.error?.message === "email or password invalid!") {
              formLogin.setFields([
                {
                  name: "email",
                  errors: [""],
                },
                {
                  name: "password",
                  errors: ["username atau password salah!"],
                },
              ]);
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <section className="w-full h-full grid grid-cols-2 bg-[#063127] ">
      <div className="w-full h-full absolute bg-auth-desk" />
      <div className="col-span-1  flex justify-end items-center  h-screen relative">
        <div className="absolute top-10 left-10 flex space-x-3 items-center">
          <img src={logo} alt="vend-logo" className="h-16 object-cover  " />
          <div>
            <p className="text-gray-200 font-semibold text-xl">GoEventID</p>
            <p className="text-gray-200 font-semibold text-base">
              Management System
            </p>
          </div>
        </div>
        <div className="rounded-md bg-white p-7 space-y-10 lg:w-9/12 2xl:w-7/12 relative">
          <div>
            <p className="font-semibold text-2xl">Hai, Selamat Datang!</p>
            <p className="text-[#00000080]">
              Masuk dengan akunmu, dan nikmati kemudahannya
            </p>
          </div>
          <Form
            validateTrigger="onSubmit"
            form={formLogin}
            autoComplete="off"
            className="space-y-8"
            // onFinish={handleLoginDesktop}
          >
            <InputText
              required
              name={"email"}
              size={"large"}
              type="email"
              placeholder={"Masukan Email"}
            />
            <InputPwd
              name={"password"}
              size={"large"}
              required
              placeholder={"Masukan Password"}
            />
            <Form.Item className="w-full">
              <Button
                type="primary"
                className="w-full text-xl font-semibold py-5"
                onClick={handleLoginDesktop}
                loading={isLoading}
                htmlType="submit"
              >
                Masuk
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="col-span-1 h-screen">
        <img
          src={goeBg}
          className="h-screen soze object-cover object-bottom-left w-full"
          alt="vend-machine"
        />
      </div>

      <div className="absolute flex justify-center w-full bottom-[2vh]">
        <p className="text-[#949494] font-semibold">
          Powered by Nana Handre Saputra |{/* v{packageJson.version} */}
        </p>
      </div>
    </section>
  );
};

export default Login;
