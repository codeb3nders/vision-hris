import axios from 'axios';
import {
  URL_EMPLOYEES,
  URL_EMPLOYEES_WITH_LEAVES,
} from 'constants/EndpointPath';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { URL_EMPLOYEE_SEARCH } from './../../constants/EndpointPath';

export const createEmployeeEndpoint = async (body: EmployeeI, config = {}) => {
  return await axios.post(URL_EMPLOYEES, body, {
    ...config,
  });
};

export const updateEmployeeEndpoint = async (data: any, config: any) => {
  const employeeNo = data.employeeNo;
  let tmp_body: any = data;
  delete tmp_body.employeeNo;
  const body = tmp_body;
  try {
    return await axios.patch(`${URL_EMPLOYEES}${employeeNo}`, body, {
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};

export const getEmployeesEndpoint = async (data: any = {
  config: {},
  employeeNo: "",
  params: {}
}) => {
  try {
    const url = data.employeeNo ? `${URL_EMPLOYEES}${data.employeeNo}` : URL_EMPLOYEES;
    return await axios.get(url, { ...data.config, params: data.params });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};

export const getEmployeesWithLeavesEndpoint = async (employeeNo?: string) => {
  const access_token = localStorage.getItem('access_token');
  const internalConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  try {
    const url = employeeNo
      ? `${URL_EMPLOYEES_WITH_LEAVES}${employeeNo}`
      : URL_EMPLOYEES_WITH_LEAVES;
    return await axios.get(url, { ...internalConfig });
  } catch (error: any) {
    console.error('ERROR in getEmployeesWithLeavesEndpoint', error);
    return error.message;
  }
};

export const deleteEmployeeEndpoint = async (employeeNo: string) => {
  const access_token = localStorage.getItem('access_token');
  const internalConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  try {
    const url = `${URL_EMPLOYEES}${employeeNo}`;
    return await axios.delete(url, { ...internalConfig });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
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
    console.error('ERROR in searchEmployeeEndpoint', error);
    return error.message;
  }
};
