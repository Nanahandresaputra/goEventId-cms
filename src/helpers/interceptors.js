///////////     TEMPORARYYYYY !!!!!!!!!!

import axios from "axios";
import { toast } from "react-toastify";
import { notifSuccess } from "./notif";

export const interceptorsUtils = () => {
  axios.interceptors.response.use(
    (res) => {
      const equalsErr = ["email or password invalid!"].includes(
        res.data?.message
      );
      console.log(res, "suceess ------");
      if (![201, 200].includes(res.status) && equalsErr) {
        toast.error(res.data?.message);
      }

      if (
        ["post", "patch", "delete"].includes(res.config.method) &&
        !equalsErr &&
        !res.config.url.includes("goEventId/api/v1/auth/login")
      ) {
        if (
          res.config.method === "post" &&
          res.data?.statusCode === 200 &&
          !res.config.url.includes("goEventId/api/v1/check-in")
        ) {
          notifSuccess({ method: "create" });
        } else if (
          res.config.method === "patch" &&
          res.data?.statusCode === 200
        ) {
          notifSuccess({ method: "edit" });
        } else if (
          res.config.method === "delete" &&
          res.data?.statusCode === 200
        ) {
          notifSuccess({ method: "delete" });
        } else {
          res.data?.message !== "success" &&
            toast.error(res.data?.message?.toString());
        }
      }

      return Promise.resolve(res);
    },
    (error) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message);
        if (
          (error?.response?.data?.statusCode === 401 &&
            error?.response?.data?.message === "Unauthorized") ||
          (error?.response?.data?.statusCode === 403 &&
            error?.response?.data?.message === "Forbidden")
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
