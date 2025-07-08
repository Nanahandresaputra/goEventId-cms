import axios from "axios";
import { config } from "../../config";

const { baseUrl } = config;

export const serviceApi = async ({
  method,
  body,
  withToken = true,
  endpoint,
  optionalHeaders = {},
}) => {
  const token = await localStorage?.token;
  return await new Promise((resolve, reject) => {
    axios({
      method,
      url: `${baseUrl}/${endpoint}`,
      ...(body && { data: body }),
      ...(withToken && { headers: { ...optionalHeaders, token } }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
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
