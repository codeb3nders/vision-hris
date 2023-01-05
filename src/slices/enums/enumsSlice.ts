import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEndpoint,
  deleteEndpoint,
  getByParamsEndpoint,
  updateEndpoint,
  getByEmployeeEndpoint,
} from "apis";
import { URL_ENUMS } from "constants/EndpointPath";

const listOfValues = {
  leaveTypes: [],
  positions: [],
  departments: [],
  ranks: [],
  civil_status: [],
  citizenship: [],
  religions: [],
  employment_status: [],
  locations: [],
  assets: [],
  file201: [],
  allowance_types: [],
  employment_types: [],
  gender: [],
  payroll_group: [],
  payment_method: [],
  violations: [],
  offenseLevel: [],
  offenseStages: [],
  violationCategories: [],
};

const initialCreateState: any = {
  createItem: null,
  createStatus: "idle",
  createError: null,
};

const initialUpdateState: any = {
  updateStatus: "idle",
  updateError: null,
};

const initialDeleteState: any = {
  deleteStatus: "idle",
  deleteError: null,
};

const initialGetState: any = {
  enumsData: [],
  status: "idle",
  error: null,
};

const initialGetByEmployeeState: any = {
  getByEmployeeItems: [],
  getByEmployeeStatus: "idle",
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
  async (data: { access_token: string; params?: any }) => {
    // console.log(data.params, "vvvvvvvvvvvvvvv")
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getByParamsEndpoint(
        URL_ENUMS,
        config,
        data.params
      );
      return [...response.data];
    } catch (err: any) {
      console.error(`${name}/get`, err);
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
    ...initialGetByEmployeeState,
    listOfValues,
  },
  reducers: {
    reset: () => {
      return {
        ...initialCreateState,
        ...initialUpdateState,
        ...initialGetState,
        ...initialDeleteState,
        ...initialGetByEmployeeState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAction.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createAction.fulfilled, (state, action) => {
        // console.log({ action });
        if (action.payload.response) {
          const { status, data } = action.payload.response;
          state.createStatus = "failed";
          state.createError = data.error;
        } else {
          state.createStatus = "succeeded";
          state.createdItem = action.payload.data;
        }
      })
      .addCase(createAction.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message;
      })
      .addCase(getAllDataAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDataAction.fulfilled, (state, action) => {
        const data = action.payload;
        state.status = "succeeded";
        // state.enumsData = action.payload;

        data.forEach((o: any) => {
          switch (o.type.toLowerCase()) {
            case "position":
              state.listOfValues.positions.push(o);
              break;
            case "civilstatus":
              state.listOfValues.civil_status.push(o);
              break;
            case "gender":
              state.listOfValues.gender.push(o);
              break;
            case "citizenship":
              state.listOfValues.citizenship.push(o);
              break;
            case "religion":
              state.listOfValues.religions.push(o);
              break;
            case "employmentstatus":
              state.listOfValues.employment_status.push(o);
              break;
            case "location":
              state.listOfValues.locations.push(o);
              break;
            case "department":
              state.listOfValues.departments.push(o);
              break;
            case "rank":
              state.listOfValues.ranks.push(o);
              break;
            case "assettype":
              state.listOfValues.assets.push(o);
              break;
            case "documenttype":
              state.listOfValues.file201.push(o);
              break;
            case "allowancetype":
              state.listOfValues.allowance_types.push(o);
              break;
            case "employmenttype":
              state.listOfValues.employment_types.push(o);
              break;
            case "payrollgroup":
              state.listOfValues.payroll_group.push(o);
              break;
            case "paymentmethod":
              state.listOfValues.payment_method.push(o);
              break;
            case "violations":
              state.listOfValues.violations.push(o);
              break;
            case "offenselevel":
              state.listOfValues.offenseLevel.push(o);
              break;
            case "offensestage":
              state.listOfValues.offenseStages.push(o);
              break;
            case "violationcategory":
              state.listOfValues.violationCategories.push(o);
              break;
            case "leavetype":
              state.listOfValues.leaveTypes.push(o);
              break;
          }
        });
      })
      .addCase(getAllDataAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateAction.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAction.fulfilled, (state, action) => {
        // console.log({ action });
        if (action.payload.response) {
          const { status, data } = action.payload.response;
          state.updateStatus = "failed";
          state.updateError = data.error;
        } else {
          state.updateStatus = "succeeded";
        }
      })
      .addCase(updateAction.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error.message;
      })
      .addCase(deleteAction.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        if (action.payload.response) {
          const { status, data } = action.payload.response;
          state.deleteStatus = "failed";
          state.deleteError = data.error;
        } else {
          state.deleteStatus = "succeeded";
        }
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.error.message;
      });
  },
});

export const newData = (state: any) => state[name].createItem;
export const newDataStatus = (state: any) => state[name].createStatus;
export const newDataError = (state: any) => state[name].createError;

// export const enumsData = (state: any) => state[name].enumsData;
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

export const getListOfValues = (state: any) => state[name].listOfValues;

export default enumsSlice.reducer;
