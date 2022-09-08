import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateEmployeeEndpoint } from 'apis/employees';
import { EmployeeI } from 'slices/interfaces/employeeI';

const initialState: any = {
    data: null,
    status: 'idle',
    error: null,
};


export const updateEmployee: any = createAsyncThunk(
    'employees/updateEmployee',
    async (data: { params: EmployeeI; access_token: string }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            return await updateEmployeeEndpoint(data.params, config);
        } catch (err: any) {
            console.error('ERROR in createEmployee', err);
            return err;
        }
    }
);

export const updateEmployeesSlice = createSlice({
    name: 'employees-update',
    initialState,
    reducers: {
        resetUpdate: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateEmployee.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                console.log({ action });
                if (action.payload.response) {
                    const { status, data } = action.payload.response;
                    state.status = 'failed';
                    state.error = data.error;
                } else {
                    state.status = 'succeeded';
                    // state.data = action.payload.data;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getEmployeeUpdateStatus = (state: any) => state.updatedEmployee.status;
export const getEmployeeUpdateError = (state: any) => state.updatedEmployee.error;
export const { resetUpdate } = updateEmployeesSlice.actions;

export default updateEmployeesSlice.reducer;
