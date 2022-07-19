import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteEmployeeEndpoint } from "apis/employees";

const initialState: any = {
  deletedItems: [],
  status: "idle",
  error: null,
};

export const deleteEmployeesAction: any = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeNo:string) => {
    try {
      const response = await deleteEmployeeEndpoint(employeeNo);
      return [...response.data];
    } catch (err: any) {
      console.error("ERROR in deleteEmployee", err);
      return err.message;
    }
  }
);

export const deleteEmployeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteEmployeesAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployeesAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deletedItems = action.payload;
      })
      .addCase(deleteEmployeesAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getDeletedItems = (state: any) => state.employee.deletedItems;
export const deleteEmployeeStatus = (state: any) => state.employee.status;
export const getEmployeeError = (state: any) => state.employee.error;
export const employeeStore = (state: any) => state.employee;

export default deleteEmployeesSlice.reducer;
