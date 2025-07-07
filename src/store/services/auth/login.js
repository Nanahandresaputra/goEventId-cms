import axios from "axios";
import { config } from "../../../config";

const { baseUrl } = config;

export const authLoginApi = async ({ body }) => {
  return await new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${baseUrl}/auth/login`,
      data: body,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          //   localStorage.setItem("token", res.data.token);
          if (res.data?.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
