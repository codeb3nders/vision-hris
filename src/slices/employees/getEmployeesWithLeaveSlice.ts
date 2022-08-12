import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesWithLeavesEndpoint } from "apis/employees";
import { EmployeesWithLeaveSlice } from "slices/interfaces/employeeI";

const initialState: EmployeesWithLeaveSlice = {
  employeeItems: [],
  status: "idle",
  error: null,
};

export const getEmployeesWithLeavesAction: any = createAsyncThunk(
  "employeesWithLeave/getEmployeesWithLeaves",
  async (employeeNo?: string) => {
    try {
      const response = await getEmployeesWithLeavesEndpoint(employeeNo);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in getEmployeesWithLeaves", err);
      return err.message;
    }
  }
);

export const getEmployeesWithLeaveSlice = createSlice({
  name: "employeesWithLeave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesWithLeavesAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployeesWithLeavesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeItems = action.payload;
      })
      .addCase(getEmployeesWithLeavesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getEmployeesWithLeaveItems = (state: any) =>
  state.employeesWithLeave.employeeItems;
export const getEmployeesWithLeaveStatus = (state: any) =>
  state.employeesWithLeave.status;
export const getEmployeesWithLeaveError = (state: any) =>
  state.employeesWithLeave.error;

export default getEmployeesWithLeaveSlice.reducer;
