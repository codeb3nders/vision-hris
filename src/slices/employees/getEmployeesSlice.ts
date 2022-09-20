import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesEndpoint } from "apis/employees";

const initialState: any = {
  employeeItems: [],
  status: "idle",
  error: null,
  employeeDetails: null,
  statusOne: "idle",
  errorOne: null,
};

export const getAllEmployeesAction: any = createAsyncThunk(
  "employees/getAllEmployees",
  async (data: { access_token: string, params?: any }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getEmployeesEndpoint(config);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in getEmployees", err);
      return err.message;
    }
  }
);

export const getOneEmployeeAction: any = createAsyncThunk(
  "employees/getOneEmployee",
  async (data: { access_token: string, params: any }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await getEmployeesEndpoint(config, data.params.employeeNo);
      return response.data;
    } catch (err: any) {
      console.error("ERROR in getEmployees", err);
      return err.message;
    }
  }
);

export const employeesSlice = createSlice({
  name: "employees-get",
  initialState,
  reducers: {
    clearEmployeeDetails: (state) => {
      return {
        ...state, employeeDetails: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeesAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllEmployeesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeItems = action.payload;
      })
      .addCase(getAllEmployeesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getOneEmployeeAction.pending, (state) => {
        state.statusOne = "loading";
      })
      .addCase(getOneEmployeeAction.fulfilled, (state, action) => {
        state.statusOne = "succeeded";
        state.employeeDetails = action.payload;
      })
      .addCase(getOneEmployeeAction.rejected, (state, action) => {
        state.statusOne = "failed";
        state.errorOne = action.error.message;
      })
  },
});

export const getEmployeeItems = (state: any) => state.employee.employeeItems;
export const getEmployeeStatus = (state: any) => state.employee.status;
export const getEmployeeError = (state: any) => state.employee.error;
export const getEmployeeDetails = (state: any) => state.employee.employeeDetails;
export const getEmployeeStatusOne = (state: any) => state.employee.statusOne;
export const getEmployeeErrorOne = (state: any) => state.employee.errorOne;
export const employeeStore = (state: any) => state.employee;

export const { clearEmployeeDetails } = employeesSlice.actions;

export default employeesSlice.reducer;
