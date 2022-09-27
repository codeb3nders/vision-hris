import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLandDEndpoint } from "apis/learningAndDev";

const initialState: any = {
  data: [],
  status: "idle",
  error: null,
  employeeData: [],
  statusOne: "idle",
  errorOne: null,
};

export const getAllDataAction: any = createAsyncThunk(
  "learningAndDevelopment/get",
  async (data: { access_token: string, params?: any }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getLandDEndpoint(config);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in learningAndDevelopment>getAllDataAction", err);
      return err.message;
    }
  }
);

export const getByEmployeeNoAction: any = createAsyncThunk(
  "learningAndDevelopment/getByEmployeeNo",
  async (data: { access_token: string, employeeNo: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getLandDEndpoint(config, data.employeeNo);
      return response.data;
    } catch (err: any) {
      console.error("ERROR in getByEmployeeNoAction", err);
      return err.message;
    }
  }
);

export const getLearnAndDevSlice = createSlice({
  name: "learningAndDevelopment-get",
  initialState,
  reducers: {
    clearLearnAndDevData: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDataAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeItems = action.payload;
      })
      .addCase(getAllDataAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getByEmployeeNoAction.pending, (state) => {
        state.statusOne = "loading";
      })
      .addCase(getByEmployeeNoAction.fulfilled, (state, action) => {
        state.statusOne = "succeeded";
        state.employeeData = action.payload;
      })
      .addCase(getByEmployeeNoAction.rejected, (state, action) => {
        state.statusOne = "failed";
        state.errorOne = action.error.message;
      })
  },
});

export const getAllLandD = (state: any) => state.getLearnAndDev.data;
export const getAllLandDStatus = (state: any) => state.getLearnAndDev.status;
export const getAllLandDError = (state: any) => state.getLearnAndDev.error;
export const getEmployeeLandDData = (state: any) => state.getLearnAndDev.employeeData;
export const getEmployeeLandDStatus = (state: any) => state.getLearnAndDev.statusOne;
export const getEmployeeLandDError = (state: any) => state.getLearnAndDev.errorOne;

export const { clearLearnAndDevData } = getLearnAndDevSlice.actions;

export default getLearnAndDevSlice.reducer;
