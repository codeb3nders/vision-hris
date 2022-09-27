import axios from 'axios';
import {
  URL_LEARNING_AND_DEV
} from 'constants/EndpointPath';
import { LearningAndDevelopmentI } from 'slices/interfaces/learningAndDevelopmentI';

export const createLandDEndpoint = async (body: LearningAndDevelopmentI, config = {}) => {
  return await axios.post(URL_LEARNING_AND_DEV, body, {
    ...config,
  });
};

export const updateLandDEndpoint = async (data: LearningAndDevelopmentI, config?: any) => {
  const employeeNo = data.employeeNo;
  let tmp_body: any = data;
  delete tmp_body.employeeNo;
  const body = tmp_body;
  try {
    return await axios.patch(`${URL_LEARNING_AND_DEV}${employeeNo}`, body, {
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in updateLandDEndpoint', error);
    return error.message;
  }
};

export const getLandDEndpoint = async (
  config?: any,
  employeeNo?: string
) => {
  try {
    const url = employeeNo ? `${URL_LEARNING_AND_DEV}${employeeNo}` : URL_LEARNING_AND_DEV;
    return await axios.get(url, { ...config });
  } catch (error: any) {
    console.error('ERROR in getLandDEndpoint', error);
    return error.message;
  }
};

export const deleteLandDEndpoint = async (id: string, config?: any) => {
  try {
    return await axios.delete(`${URL_LEARNING_AND_DEV}${id}`, {
      ...config,
    });
  } catch (error: any) {
    console.error('ERROR in deleteLandDEndpoint', error);
    return error.message;
  }
};
