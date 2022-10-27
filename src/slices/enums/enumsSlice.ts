import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEndpoint, deleteEndpoint, getByParamsEndpoint, updateEndpoint, getByEmployeeEndpoint } from 'apis';
import { URL_ENUMS } from "constants/EndpointPath";

const initialCreateState: any = {
  createItem: null,
  createStatus: 'idle',
  createError: null,
};

const initialUpdateState: any = {
  updateStatus: 'idle',
  updateError: null,
};

const initialDeleteState: any = {
  deleteStatus: 'idle',
  deleteError: null,
};

const initialGetState: any = {
  enumsData: [],
  status: 'idle',
  error: null,
};

const initialGetByEmployeeState: any = {
  getByEmployeeItems: [],
  getByEmployeeStatus: 'idle',
  getByEmployeeError: null,
};

const name = "enums";

export const createAction: any = createAsyncThunk(
  `${name}/create`,
  async (data: { body: any; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await createEndpoint(URL_ENUMS, data.body, config);
    } catch (err: any) {
      console.error(`${name}/create`, err);
      return err;
    }
  }
);

export const getAllDataAction: any = createAsyncThunk(
  `${name}/get`,
    async (data: { access_token: string, params?: any }) => {
      console.log(data.params, "vvvvvvvvvvvvvvv")
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getByParamsEndpoint(URL_ENUMS, config, data.params);
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
      const response = await getByEmployeeEndpoint(URL_ENUMS, config, data.employeeNo);
      return response.data;
    } catch (err: any) {
      console.error(`${name}/getByEmployeeNo`, err);
      return err.message;
    }
  }
);

export const updateAction: any = createAsyncThunk(
  `${name}/update`,
  async (data: { params: any; access_token: string }) => {
      try {
          const config = {
              headers: { Authorization: `Bearer ${data.access_token}` },
          };
          return await updateEndpoint(URL_ENUMS, data.params, config);
      } catch (err: any) {
          console.error(`${name}/update`, err);
          return err;
      }
  }
);

export const deleteAction: any = createAsyncThunk(
  `${name}/delete`,
  async (data: { id: string; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await deleteEndpoint(URL_ENUMS, data.id, config);
    } catch (err: any) {
      console.error(`${name}/delete`, err);
      return err;
    }
  }
);

export const enumsSlice = createSlice({
  name,
  initialState: {
    ...initialCreateState,
    ...initialUpdateState,
    ...initialGetState,
    ...initialDeleteState,
    ...initialGetByEmployeeState
  },
  reducers: {
    reset: () => {
      return {
        ...initialCreateState,
        ...initialUpdateState,
        ...initialGetState,
        ...initialDeleteState,
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
        state.status = 'loading';
      })
      .addCase(getAllDataAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enumsData = action.payload;
      })
      .addCase(getAllDataAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
    .addCase(updateAction.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateAction.fulfilled, (state, action) => {
        console.log({ action });
        if (action.payload.response) {
            const { status, data } = action.payload.response;
            state.updateStatus = 'failed';
            state.updateError = data.error;
        } else {
            state.updateStatus = 'succeeded';
        }
      })
      .addCase(updateAction.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.error.message;
      })
    .addCase(deleteAction.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        if (action.payload.response) {
            const { status, data } = action.payload.response;
            state.deleteStatus = 'failed';
            state.deleteError = data.error;
        } else {
            state.deleteStatus = 'succeeded';
        }
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.deleteError = action.error.message;
      })
  },
});

export const newData = (state: any) => state[name].createItem;
export const newDataStatus = (state: any) => state[name].createStatus;
export const newDataError = (state: any) => state[name].createError;

export const enumsData = (state: any) => state[name].enumsData;
export const status = (state: any) => state[name].status;
export const error = (state: any) => state[name].error;

export const data = (state: any) => state[name].getByEmployeeItems;
export const dataStatus = (state: any) => state[name].getByEmployeeStatus;
export const dataError = (state: any) => state[name].getByEmployeeError;

export const updateStatus = (state: any) => state[name].updateStatus;
export const updateError = (state: any) => state[name].updateError;

export const deleteStatus = (state: any) => state[name].deleteStatus;
export const deleteError = (state: any) => state[name].deleteError;


export const { reset } = enumsSlice.actions;

export default enumsSlice.reducer;
