import axios from "axios";
import { toast } from "react-toastify";
import { removeCookies } from "./cookies";

///////////     TEMPORARYYYYY !!!!!!!!!!

const exceptMssg = [
  "Invalid Pin",
  "Invalid Username/Password",
  "Insufficient Balance",
  "Email Not Register",
];

// Session Expired

const errBadReq = [400, 401, 404];

export const interceptorsUtils = () => {
  axios.interceptors.response.use(
    (res) => {
      // console.log(res, "suceess ------");
      return Promise.resolve(res);
    },
    (error) => {
      if (errBadReq.includes(error?.status)) {
        if (!exceptMssg.includes(error?.response?.data?.errorMssg)) {
          toast.error(error?.response?.data?.errorMssg);
        }
        if (
          error?.response?.data?.errorMssg === "Session Expired" ||
          error?.response?.data?.errorMssg === "Invalid Token"
        ) {
          removeCookies({
            keys: ["userIdentity", "identity", "store", "loggedIn", "fullname"],
          });
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        toast.error("Terjadi kesalahan, mohon coba beberapa saat lagi!");
      }

      console.log(error);
      return Promise.reject(error);
    }
  );
};
