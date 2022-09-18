import axios from 'axios';
import {
  URL_EMPLOYEE_HISTORY
} from 'constants/EndpointPath';

export const getEmployeeHistoryEndpoint = async (
  config: any,
  employeeNo: string
) => {
  try {
    const url = `${URL_EMPLOYEE_HISTORY}${employeeNo}`;
    return await axios.get(url, { ...config });
  } catch (error: any) {
    console.error('ERROR in getEmployeesEndpoint', error);
    return error.message;
  }
};