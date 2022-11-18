import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createEndpoint, deleteEndpoint, getByEmployeeEndpoint, getByParamsEndpoint, updateEndpoint } from 'apis';
import { URL_USER_LOGS } from 'constants/EndpointPath';

const initialCreateState: any = {
  createItem: null,
  createStatus: 'idle',
  createError: null,
};

const initialGetState: any = {
  getItems: [],
  getStatus: 'idle',
  getError: null,
};

const initialGetByEmployeeState: any = {
  getByEmployeeItems: [],
  getByEmployeeStatus: 'idle',
  getByEmployeeError: null,
};

const name = "user-logs";

export const createAction: any = createAsyncThunk(
  `${name}/create`,
  async (data: { body: any; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await createEndpoint(URL_USER_LOGS, data.body, config);
    } catch (err: any) {
      console.error(`${name}/create`, err);
      return err;
    }
  }
);

export const getAllDataAction: any = createAsyncThunk(
  `${name}/get`,
  async (data: { access_token: string, params?: any }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getByParamsEndpoint(URL_USER_LOGS, config, data.params);
      return [...response.data];
    } catch (err: any) {
      console.error(`${name}/get`, err);
      return err.message;
    }
  }
);

export const getByEmployeeNoAction: any = createAsyncThunk(
  `${name}/getByEmployeeNo`,
  async (data: { access_token: string, employeeNo: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getByEmployeeEndpoint(URL_USER_LOGS, config, data.employeeNo);
      return response.data;
    } catch (err: any) {
      console.error(`${name}/getByEmployeeNo`, err);
      return err.message;
    }
  }
);

export const auditLogsSlice = createSlice({
  name,
  initialState: {
    ...initialCreateState,
    ...initialGetState,
    ...initialGetByEmployeeState
  },
  reducers: {
    reset: () => {
      return {
        ...initialCreateState,
        ...initialGetState,
        ...initialGetByEmployeeState
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createAction.fulfilled, (state, action) => {
        console.log({ action });
        if (action.payload.response) {
          const { status, data } = action.payload.response;
          state.createStatus = 'failed';
          state.createError = data.error;
        } else {
          state.createStatus = 'succeeded';
          state.createdItem = action.payload.data;
        }
      })
      .addCase(createAction.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.error.message;
      })
    .addCase(getAllDataAction.pending, (state) => {
        state.getStatus = 'loading';
      })
      .addCase(getAllDataAction.fulfilled, (state, action) => {
        state.getStatus = "succeeded";
        state.getItems = action.payload;
      })
      .addCase(getAllDataAction.rejected, (state, action) => {
        state.getStatus = 'failed';
        state.getError = action.error.message;
      })
    .addCase(getByEmployeeNoAction.pending, (state) => {
        state.getByEmployeeStatus = 'loading';
      })
      .addCase(getByEmployeeNoAction.fulfilled, (state, action) => {
        state.getByEmployeeStatus = "succeeded";
        state.getByEmployeeItems = action.payload;
      })
      .addCase(getByEmployeeNoAction.rejected, (state, action) => {
        state.getByEmployeeStatus = 'failed';
        state.getByEmployeeError = action.error.message;
      })
  },
});

export const newData = (state: any) => state[name].createItem;
export const newDataStatus = (state: any) => state[name].createStatus;
export const newDataError = (state: any) => state[name].createError;

export const data = (state: any) => state[name].getItems || [];
export const dataStatus = (state: any) => state[name].getStatus;
export const dataError = (state: any) => state[name].getError;

export const employeeData = (state: any) => state[name].getByEmployeeItems;
export const employeeDataStatus = (state: any) => state[name].getByEmployeeStatus;
export const employeeDataError = (state: any) => state[name].getByEmployeeError;

export const { reset } = auditLogsSlice.actions;

export default auditLogsSlice.reducer;
