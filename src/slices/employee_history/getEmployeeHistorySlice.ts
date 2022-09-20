import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeHistoryEndpoint } from "apis/employee_history";

const initialState: any = {
  data: [],
  status: "idle",
  error: null
};

export const getEmployeeHistoryAction: any = createAsyncThunk(
  "employee_history/getEmployeeHistory",
  async (data: { access_token: string, employeeNo: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getEmployeeHistoryEndpoint(config, data.employeeNo);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in getEmployees", err);
      return err.message;
    }
  }
);

export const employeeHistorySlice = createSlice({
  name: "employeeHistory-get",
  initialState,
  reducers: {
    clearHistoryData: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeHistoryAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployeeHistoryAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getEmployeeHistoryAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const getEmployeeHistoryData = (state: any) => state.employeeHistory.data;
export const getEmployeeHistoryStatus = (state: any) => state.employeeHistory.status;
export const getEmployeeHistoryError = (state: any) => state.employeeHistory.error;
export const employeeHistoryStore = (state: any) => state.employeeHistory;

export const { clearHistoryData } = employeeHistorySlice.actions;

export default employeeHistorySlice.reducer;
