import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  //baseURL: "https://codercomm-api-dot-cs-platform-306304.et.r.appspot.com/api",
  baseURL: BASE_URL,
  params: {},
});

/**
 * console.log all requests and responses
 */
apiService.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    console.log("Starting Request", BASE_URL);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", { error });
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response.data;
  },
  function (error) {
    console.log("RESPONSE ERROR", { error });
    const message = error.response?.data?.errors?.message || "Unknown Error";
    return Promise.reject({ message });
  }
);

export default apiService;
