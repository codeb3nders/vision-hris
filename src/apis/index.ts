import axios from "axios";

export const createEndpoint = async (url: string, body: any, config = {}) => {
  try {
    return await axios.post(url, body, {
      ...config,
    });
  } catch (error: any) {
    console.error(`ERROR in createEndpoint: ${url}`, error);
    return error.message;
  }
};

export const updateEndpoint = async (url: string, data: any, config?: any) => {
  const id = data.id;
  let tmp_body: any = data;
  delete tmp_body.id;
  const body = tmp_body;
  try {
    return await axios.patch(`${url}${id}`, body, {
      ...config,
    });
  } catch (error: any) {
    console.error(`ERROR in updateEndpoint: ${url}`, error);
    return error.message;
  }
};

export const getByParamsEndpoint = async (
  url: string,
  config: any,
  params?: any
) => {
  try {
    const urlParams = params ? new URLSearchParams(params) : {};

    return await axios.get(url, { ...config, params });
  } catch (error: any) {
    console.error(`ERROR in getByParamsEndpoint: ${url}`, error);
    return error.message;
  }
};

export const getByEmployeeEndpoint = async (
  url: string,
  config: any,
  employeeNo: string
) => {
  try {
    return await axios.get(`${url}${employeeNo}`, { ...config });
  } catch (error: any) {
    console.error(`ERROR in getByEmployeeEndpoint: ${url}`, error);
    return error.message;
  }
};

export const deleteEndpoint = async (url: string, id: string, config?: any) => {
  try {
    return await axios.delete(`${url}${id}`, {
      ...config,
    });
  } catch (error: any) {
    console.error(`ERROR in deleteEndpoint: ${url}`, error);
    return error.message;
  }
};
