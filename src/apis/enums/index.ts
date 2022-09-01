import axios from 'axios';
import {
    URL_ENUMS
} from 'constants/EndpointPath';
import { EmployeeI } from 'slices/interfaces/employeeI';

export const createEnumEndpoint = async (body: EmployeeI, config = {}) => {
    try {
        return await axios.post(URL_ENUMS, body, {
            ...config,
        });
    } catch (error: any) {
        console.error('ERROR in getEmployeesEndpoint', error);
        return error.message;
    }
};

export const updateEnumEndpoint = async (body: EmployeeI, config: any) => {
    try {
        return await axios.patch(`${URL_ENUMS}${body.employeeNo}`, body, {
            ...config,
        });
    } catch (error: any) {
        console.error('ERROR in getEmployeesEndpoint', error);
        return error.message;
    }
};

export const getEnumEndpoint = async (config: any, params?: any) => {
    try {
        const url = `${URL_ENUMS}`;
        return await axios.get(url, { ...config, params });
    } catch (error: any) {
        console.error('ERROR in getEmployeesEndpoint', error);
        return error.message;
    }
};