import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createEmployeeEndpoint, updateEmployeeEndpoint } from 'apis/employees';
import { EmployeeI } from 'slices/interfaces/employeeI';

const initialState: any = {
  employeeCreatedItem: null,
  status: 'idle',
  error: null,
};

export const createEmployee: any = createAsyncThunk(
  'employees/createEmployee',
  async (data: { body: EmployeeI; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await createEmployeeEndpoint(data.body, config);
    } catch (err: any) {
      console.error('ERROR in createEmployee', err);
      return err;
    }
  }
);

export const createEmployeesSlice = createSlice({
  name: 'employees-create',
  initialState,
  reducers: {
    resetCreate: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        console.log({ action });
        if (action.payload.response) {
          const { status, data } = action.payload.response;
          state.status = 'failed';
          state.error = data.error;
        } else {
          state.status = 'succeeded';
          state.employeeCreatedItem = action.payload.data;
        }
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getEmployeeCreatedItem = (state: any) =>
  state.newEmployee.employeeCreatedItem;
export const getEmployeeCreateStatus = (state: any) => state.newEmployee.status;
export const getEmployeeCreateError = (state: any) => state.newEmployee.error;
export const { resetCreate } = createEmployeesSlice.actions;

export default createEmployeesSlice.reducer;
