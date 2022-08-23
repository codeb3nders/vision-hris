import axios from 'axios';
import {
    URL_LIST_OF_VALUES
} from 'constants/EndpointPath';
import { EmployeeI } from 'slices/interfaces/employeeI';

export const createLOVEndpoint = async (body: EmployeeI, config = {}) => {
    try {
        return await axios.post(URL_LIST_OF_VALUES, body, {
            ...config,
        });
    } catch (error: any) {
        console.error('ERROR in getEmployeesEndpoint', error);
        return error.message;
    }
};

export const updateLOVEndpoint = async (body: EmployeeI, config: any) => {
    try {
        return await axios.patch(`${URL_LIST_OF_VALUES}${body.employeeNo}`, body, {
            ...config,
        });
    } catch (error: any) {
        console.error('ERROR in getEmployeesEndpoint', error);
        return error.message;
    }
};

export const getLOVEndpoint = async (config: any, table: string, params?: any) => {
    try {
        const url = `${URL_LIST_OF_VALUES}${table}`;
        return await axios.get(url, { ...config, ...params });
    } catch (error: any) {
        console.error('ERROR in getEmployeesEndpoint', error);
        return error.message;
    }
};