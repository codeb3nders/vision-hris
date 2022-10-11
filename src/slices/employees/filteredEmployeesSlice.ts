import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeesEndpoint } from "apis/employees";

const initialState: any = {
    filteredData: [],
    status: "idle",
    error: null,
    employeeExistsStatus: "idle",
    employeeExists: [],
    errorExists: null
};

export const getFilteredEmployeesAction: any = createAsyncThunk(
    "employees/getFilteredEmployees",
    async (data: { access_token: string, params?: any }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            const response = await getEmployeesEndpoint({config, params: data.params});
            return [...response.data];
        } catch (err: any) {
            console.error("ERROR in getEmployees", err);
            return err.message;
        }
    }
);

export const checkEmployeeExists: any = createAsyncThunk(
    "employees/checkEmployee",
    async (data: { access_token: string, params?: any }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            const response = await getEmployeesEndpoint({config, params: data.params});
            return [...response.data];
        } catch (err: any) {
            console.error("ERROR in getEmployees", err);
            return err.message;
        }
    }
);


export const filteredEmployeesSlice = createSlice({
    name: "employees-get-filtered",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredEmployeesAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getFilteredEmployeesAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filteredData = action.payload;
            })
            .addCase(getFilteredEmployeesAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
        .addCase(checkEmployeeExists.pending, (state) => {
                state.employeeExistsStatus = "loading";
            })
            .addCase(checkEmployeeExists.fulfilled, (state, action) => {
                state.employeeExistsStatus = "succeeded";
                state.employeeExists = action.payload;
            })
            .addCase(checkEmployeeExists.rejected, (state, action) => {
                state.employeeExistsStatus = "failed";
                state.errorExists = action.error.message;
            })
    },
});

export const filteredEmployeeStore = (state: any) => state.filteredEmployees;

export default filteredEmployeesSlice.reducer;
