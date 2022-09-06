import axios from 'axios';
import {
  URL_EMPLOYEES,
  URL_EMPLOYEES_WITH_LEAVES,
} from 'constants/EndpointPath';
import { EmployeeI } from 'slices/interfaces/employeeI';

export const createEmployeeEndpoint = async (body: EmployeeI, config = {}) => {
  return await axios.post(URL_EMPLOYEES, body, {
    ...config,
  });
};

export const updateEmployeeEndpoint = async (body: EmployeeI, config?: any) => {
  const access_token = localStorage.getItem('access_token');
  const internalConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  };
  try {
    return await axios.patch(`${URL_EMPLOYEES}${body.employeeNo}`, body, {
      ...internalConfig,
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};

export const getEmployeesEndpoint = async (
  config?: any,
  employeeNo?: string
) => {
  try {
    const url = employeeNo ? `${URL_EMPLOYEES}${employeeNo}` : URL_EMPLOYEES;
    return await axios.get(url, { ...config });
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
