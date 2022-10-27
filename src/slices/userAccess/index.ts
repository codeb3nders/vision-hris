import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getByParamsEndpoint } from 'apis';
import { createCredentialsEndpoint, updateUserCredentialsEndpoint } from 'apis/userAccess';
import { URL_USER_CREDENTIALS } from 'constants/EndpointPath';

const initialState: any = {
    data: {},
    status: 'idle',
    error: null,
    updateStatus: 'idle',
    updateError: null
};

interface UserCredentialsI { employeeNo: string, accessGroup: string }

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

export const updateUserAccess: any = createAsyncThunk(
    'userAccess/update',
    async (data: { params: any; access_token: string }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            return await updateUserCredentialsEndpoint(data.params, config);
        } catch (err: any) {
            console.error(`ERROR in updateUserAccess`, err);
            return err;
        }
    }
);

export const userAccessSlice = createSlice({
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
            })
            .addCase(updateUserAccess.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserAccess.fulfilled, (state, action) => {
                if (action.payload.response) {
                    const { status, data } = action.payload.response;
                    state.updateStatus = 'failed';
                    state.updateError = data.error;
                } else {
                    state.updateStatus = 'succeeded';
                }
            })
            .addCase(updateUserAccess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const userAccess = (state: any) => state.userAccess

export default userAccessSlice.reducer;
