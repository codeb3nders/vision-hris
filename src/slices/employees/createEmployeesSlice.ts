import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createEmployeeEndpoint } from "apis/employees";

import {EmployeeI} from '../interfaces'

const initialState: any = {
  employeeCreatedItem: {},
  status: "idle",
  error: null,
};

export const createEmployee: any = createAsyncThunk(
  "employees/createEmployee",
  async (body:EmployeeI, config?:any) => {
    try {
      const response = await createEmployeeEndpoint(body,config);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in createEmployee", err);
      return err.message;
    }
  }
);

export const createEmployeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeItems = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getEmployeeCreatedItem = (state: any) => state.employee.employeeCreatedItem;
export const getEmployeeCreateStatus = (state: any) => state.employee.status;
export const getEmployeeCreateError = (state: any) => state.employee.error;

export default createEmployeesSlice.reducer;
