import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesEndpoint } from "apis/employees";

const initialState: any = {
  employeeItems: [],
  status: "idle",
  error: null,
};

export const getEmployeesAction: any = createAsyncThunk(
  "employees/getEmployees",
  async (access_token: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };
      const response = await getEmployeesEndpoint(config);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in getEmployees", err);
      return err.message;
    }
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployeesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeItems = action.payload;
      })
      .addCase(getEmployeesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getEmployeeItems = (state: any) => state.employee.employeeItems;
export const getEmployeeStatus = (state: any) => state.employee.status;
export const getEmployeeError = (state: any) => state.employee.error;
export const employeeStore = (state: any) => state.employee;

export default employeesSlice.reducer;
