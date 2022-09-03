import axios from "axios";

import Environments from "@src/constants/Environments";

const instance = axios.create({
  baseURL: Environments.API_BASE_URL,
});

export default instance;
