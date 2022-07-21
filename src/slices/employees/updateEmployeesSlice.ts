import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateEmployeeEndpoint } from "apis/employees";

import {EmployeeI} from '../interfaces'

const initialState: any = {
  employeeUpdatedItem: {},
  status: "idle",
  error: null,
};

export const updateEmployeeAction: any = createAsyncThunk(
  "employees/updateEmployeeAction",
  async (body:EmployeeI, config?:any) => {
    try {
      const response = await updateEmployeeEndpoint(body,config);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in updateEmployeeAction", err);
      return err.message;
    }
  }
);

export const updateEmployeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployeeAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeItems = action.payload;
      })
      .addCase(updateEmployeeAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getEmployeeUpdatedItem = (state: any) => state.employee.employeeUpdatedItem;
export const getEmployeeUpdateStatus = (state: any) => state.employee.status;
export const getEmployeeUpdateError = (state: any) => state.employee.error;

export default updateEmployeesSlice.reducer;
