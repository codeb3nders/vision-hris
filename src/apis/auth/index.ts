import axios from "axios";

import { URL_LOGIN } from "constants/EndpointPath";
import { LoginI } from "slices/interfaces/employeeI";

export const login = async (body: LoginI, config?: any) => {
  try {
    const response = await axios.post(URL_LOGIN, body);
    // localStorage.setItem("credential", JSON.stringify(response.data));
    return response;
  } catch (error: any) {
    return error;
  }
};
