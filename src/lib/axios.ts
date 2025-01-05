import axios from "axios";
import { AXIOS_BASE_URL } from "@/configs";

const config = {
  baseURL: AXIOS_BASE_URL.v1,
};

const axiosInstance = axios.create(config);

export default axiosInstance;
