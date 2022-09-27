import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAssetEndpoint } from "apis/assets";

const initialState: any = {
  data: [],
  status: "idle",
  error: null,
  employeeData: [],
  statusOne: "idle",
  errorOne: null,
};

export const getAllDataAction: any = createAsyncThunk(
  "assets/get",
  async (data: { access_token: string, params?: any }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getAssetEndpoint(config);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in assets>getAllDataAction", err);
      return err.message;
    }
  }
);

export const getByEmployeeNoAction: any = createAsyncThunk(
  "assets/getByEmployeeNo",
  async (data: { access_token: string, employeeNo: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getAssetEndpoint(config, data.employeeNo);
      return response.data;
    } catch (err: any) {
      console.error("ERROR in getByEmployeeNoAction", err);
      return err.message;
    }
  }
);

export const getAssetsSlice = createSlice({
  name: "assets-get",
  initialState,
  reducers: {
    clearAssetsData: () => {
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

export const getAllAssets = (state: any) => state.getAssets.data;
export const getAllAssetsStatus = (state: any) => state.getAssets.status;
export const getAllAssetsError = (state: any) => state.getAssets.error;
export const getEmployeeAssetsData = (state: any) => state.getAssets.employeeData;
export const getEmployeeAssetsStatus = (state: any) => state.getAssets.statusOne;
export const getEmployeeAssetsError = (state: any) => state.getAssets.errorOne;

export const { clearAssetsData } = getAssetsSlice.actions;

export default getAssetsSlice.reducer;
