import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCredentialsEndpoint } from 'apis/userAccess';

const initialState: any = {
    data: {},
    status: 'idle',
    error: null,
};

interface UserCredentialsI { employeeNo: string }

export const createUserAccess: any = createAsyncThunk(
    'userAccess/create',
    async (data: { body: UserCredentialsI, access_token: string }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            const response = await createCredentialsEndpoint(data.body, config);
            return response;
        } catch (err: any) {
            console.error('ERROR in createEmployee', err);
            return err.message;
        }
    }
);

export const createUserAccessSlice = createSlice({
    name: 'userAccess-create',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAccess.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAccess.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(createUserAccess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const userAccess = (state: any) => state.userAccess

export default createUserAccessSlice.reducer;
