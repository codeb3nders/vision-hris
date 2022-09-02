import axios from 'axios';
import {
    URL_USER_CREDENTIALS
} from 'constants/EndpointPath';

interface UserCredentialsI { employeeNo: string }

export const createCredentialsEndpoint = async (body: UserCredentialsI, config = {}) => {
    try {
        return await axios.post(URL_USER_CREDENTIALS, body, {
            ...config,
        });
    } catch (error: any) {
        console.error('ERROR in createCredentialsEndpoint', error);
        return error.message;
    }
};

export const updateUserCredentialsEndpoint = async (body: UserCredentialsI, config: any) => {
    try {
        return await axios.patch(`${URL_USER_CREDENTIALS}${body.employeeNo}`, body, {
            ...config,
        });
    } catch (error: any) {
        console.error('ERROR in updateUserCredentialsEndpoint', error);
        return error.message;
    }
};

export const getUserCredentialsEndpoint = async (config: any, params?: any) => {
    try {
        const url = `${URL_USER_CREDENTIALS}`;
        return await axios.get(url, { ...config, params });
    } catch (error: any) {
        console.error('ERROR in getUserCredentialsEndpoint', error);
        return error.message;
    }
};