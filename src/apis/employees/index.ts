import axios from 'axios';
import {
  URL_EMPLOYEES,
  URL_EMPLOYEES_WITH_LEAVES,
} from 'constants/EndpointPath';
import { EmployeeI } from 'slices/interfaces/employeeI';

const rawData = localStorage.getItem('credential');
const data = rawData && JSON.parse(rawData);
const internalConfig = {
  headers: { Authorization: `Bearer ${data && data.access_token}` },
};
export const createEmployeeEndpoint = async (body: EmployeeI, config?: any) => {
  try {
    return await axios.post(URL_EMPLOYEES, body, {
      ...internalConfig,
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};

export const updateEmployeeEndpoint = async (body: EmployeeI, config?: any) => {
  try {
    return await axios.patch(URL_EMPLOYEES, body, {
      ...internalConfig,
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};

export const getEmployeesEndpoint = async (employeeNo?: string) => {
  try {
    const url = employeeNo ? `${URL_EMPLOYEES}${employeeNo}` : URL_EMPLOYEES;
    const rawData = localStorage.getItem('credential');
    const data = rawData && JSON.parse(rawData);
    return await axios.get(url, {
      headers: { Authorization: `Bearer ${data && data.access_token}` },
    });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};

export const getEmployeesWithLeavesEndpoint = async (employeeNo?: string) => {
  try {
    const url = employeeNo
      ? `${URL_EMPLOYEES_WITH_LEAVES}${employeeNo}`
      : URL_EMPLOYEES_WITH_LEAVES;
    console.log('URL', url);
    return await axios.get(url, { ...internalConfig });
  } catch (error: any) {
    console.error('ERROR in getEmployeesWithLeavesEndpoint', error);
    return error.message;
  }
};

export const deleteEmployeeEndpoint = async (employeeNo: string) => {
  try {
    const url = `${URL_EMPLOYEES}${employeeNo}`;
    return await axios.delete(url, { ...internalConfig });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};
