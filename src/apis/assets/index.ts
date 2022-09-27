import axios from 'axios';
import {
  URL_ASSETS
} from 'constants/EndpointPath';

export const createAssetEndpoint = async (body: any, config = {}) => {
  return await axios.post(URL_ASSETS, body, {
    ...config,
  });
};

export const updateAssetEndpoint = async (data: any, config?: any) => {
  const employeeNo = data.employeeNo;
  let tmp_body: any = data;
  delete tmp_body.employeeNo;
  const body = tmp_body;
  try {
    return await axios.patch(`${URL_ASSETS}${employeeNo}`, body, {
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in updateAssetEndpoint', error);
    return error.message;
  }
};

export const getAssetEndpoint = async (
  config?: any,
  employeeNo?: string
) => {
  try {
    const url = employeeNo ? `${URL_ASSETS}${employeeNo}` : URL_ASSETS;
    return await axios.get(url, { ...config });
  } catch (error: any) {
    console.error('ERROR in getAssetEndpoint', error);
    return error.message;
  }
};

export const deleteAssetEndpoint = async (id: string, config?: any) => {
  try {
    return await axios.delete(`${URL_ASSETS}${id}`, {
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in deleteAssetEndpoint', error);
    return error.message;
  }
};
