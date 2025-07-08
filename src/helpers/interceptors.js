///////////     TEMPORARYYYYY !!!!!!!!!!

import axios from "axios";
import { toast } from "react-toastify";

export const interceptorsUtils = () => {
  axios.interceptors.response.use(
    (res) => {
      console.log(res, "suceess ------");
      if (
        ![201, 200].includes(res.data?.statusCode) &&
        res.data?.message !== "email or password invalid!"
      ) {
        toast.error(res.data?.message);
      }
      return Promise.resolve(res);
    },
    (error) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message);
        if (
          error?.response?.statusCode === 401 &&
          error?.response?.message === "Unauthorized"
        ) {
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        toast.error("Terjadi kesalahan, mohon coba beberapa saat lagi!");
      }
      // if (errBadReq.includes(error?.status)) {
      //   if (!exceptMssg.includes(error?.response?.data?.errorMssg)) {
      //     toast.error(error?.response?.data?.errorMssg);
      //   }
      //   if (
      //     error?.response?.data?.errorMssg === "Session Expired" ||
      //     error?.response?.data?.errorMssg === "Invalid Token"
      //   ) {

      //     sessionStorage.clear();
      // localStorage.clear();
      // window.location.href = "/login";
      //   }
      // } else {
      //   toast.error("Terjadi kesalahan, mohon coba beberapa saat lagi!");
      // }

      console.log(error, "--------- error else");
      return Promise.reject(error);
    }
  );
};
