import axios from "axios";
import {
  URL_EMPLOYEES,
  URL_EMPLOYEES_WITH_LEAVES,
} from "constants/EndpointPath";
import { EmployeeI } from "slices/interfaces/employeeI";
import { URL_EMPLOYEE_SEARCH } from "./../../constants/EndpointPath";

var querystring = require('querystring');

export const createEmployeeEndpoint = async (body: EmployeeI, config = {}) => {
  return await axios.post(URL_EMPLOYEES, body, {
    ...config,
  });
};

export const updateEmployeeEndpoint = async (data: any, config: any, params:any = null) => {
  const body = data;
  console.log({ body }, "updateEmployeeEndpoint")
  let url = `${URL_EMPLOYEES}update`;
  if (params) {
    url += "/" + querystring.stringify(params)
  }
  try {
    return await axios.patch(url, body, {
      ...config,
    });
  } catch (error: any) {
    console.error("ERROR in getEmployeesEndpoint", error);
    return error.message;
  }
};

export const getEmployeesEndpoint = async (
  data: any = {
    config: {},
    employeeNo: "",
    params: {},
  }
) => {
  try {
    const url = data.employeeNo
      ? `${URL_EMPLOYEES}${data.employeeNo}`
      : URL_EMPLOYEES;
    return await axios.get(url, { ...data.config, params: data.params });
  } catch (error: any) {
    console.error("ERROR in getEmployeesEndpoint", error);
    return error.message;
  }
};

export const getEmployeesWithLeavesEndpoint = async (employeeNo?: string) => {
  const access_token = localStorage.getItem("access_token");
  const internalConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  try {
    const url = employeeNo
      ? `${URL_EMPLOYEES_WITH_LEAVES}${employeeNo}`
      : URL_EMPLOYEES_WITH_LEAVES;
    return await axios.get(url, { ...internalConfig });
  } catch (error: any) {
    console.error("ERROR in getEmployeesWithLeavesEndpoint", error);
    return error.message;
  }
};

export const deleteEmployeeEndpoint = async (employeeNo: string) => {
  const access_token = localStorage.getItem("access_token");
  const internalConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  try {
    const url = `${URL_EMPLOYEES}${employeeNo}`;
    return await axios.delete(url, { ...internalConfig });
  } catch (error: any) {
    console.error("ERROR in getEmployeesEndpoint", error);
    return error.message;
  }
};

export const searchEmployeeEndpoint = async ({ name, access_token }) => {
  const internalConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  try {
    const url = `${URL_EMPLOYEE_SEARCH}name=${name}`;
    return await axios.get(url, { ...internalConfig });
  } catch (error: any) {
    console.error("ERROR in searchEmployeeEndpoint", error);
    return error.message;
  }
};
