import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createEmployeeEndpoint } from 'apis/employees';
import { EmployeeI } from 'slices/interfaces/employeeI';

const initialState: any = {
  employeeItems: {},
  status: 'idle',
  error: null,
};

export const createEmployee: any = createAsyncThunk(
  'employees/createEmployee',
  async (data: { body: EmployeeI, access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      const response = await createEmployeeEndpoint(data.body, config);
      return response;
    } catch (err: any) {
      console.error('ERROR in createEmployee', err);
      return err.message;
    }
  }
);

export const createEmployeesSlice = createSlice({
  name: 'employees-create',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employeeItems = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getEmployeeCreatedItem = (state: any) =>
  state.employee.employeeCreatedItem;
export const getEmployeeCreateStatus = (state: any) => state.employee.status;
export const getEmployeeCreateError = (state: any) => state.employee.error;

export default createEmployeesSlice.reducer;
