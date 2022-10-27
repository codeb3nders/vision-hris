import axios from 'axios';
import {
    URL_USER_CREDENTIALS, URL_FORGOT_PASSWORD, URL_VALIDATE_CODE, URL_CHANGE_PASSWORD
} from 'constants/EndpointPath';

export interface UserCredentialsI { employeeNo: string, accessGroup: string, isActive?: boolean }

export interface CodeValidationI { employeeNo: string, code: string, password: string }

export interface PasswordChangeI {employeeNo: string, oldPassword: string, newPassword: string}

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

export const getForgotPasswordEndpoint = async (employeeNo: string) => {
    try {
        const url = `${URL_FORGOT_PASSWORD}${employeeNo}`;
        return await axios.get(url);
    } catch (error: any) {
        console.error('ERROR in getForgotPasswordEndpoint', error);
        return error.message;
    }
};

export const validateCodeEndpoint = async (body: CodeValidationI) => {
    try {
        return await axios.patch(`${URL_VALIDATE_CODE}${body.employeeNo}/${body.code}`, {password: body.password});
    } catch (error: any) {
        console.error('ERROR in validateCodeEndpoint', error);
        return error.message;
    }
};

export const changePasswordEndpoint = async (config: any, body: PasswordChangeI) => {
    try {
        const employeeNo = body.employeeNo;
        const params = {
            oldPassword: body.oldPassword,
            newPassword: body.newPassword
        }
        return await axios.patch(`${URL_CHANGE_PASSWORD}${employeeNo}`, params, config);
    } catch (error: any) {
        console.error('ERROR in updateUserCredentialsEndpoint', error);
        return error.message;
    }
};