import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import { base_backend_url } from "./config";

const api_url = base_backend_url;

const client = (() => {
  return axios.create({
    baseURL: api_url,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
})();

const request = async (options: AxiosRequestConfig) => {
  const token = localStorage.getItem("auth-token");

  const defaultOptions: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      lang: localStorage.getItem("i18nextLng") || "ar",
    },
  };

  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  };

  return client(Object.assign({}, defaultOptions, options))
    .then(onSuccess)
    .catch(onError);
};

export default request;
