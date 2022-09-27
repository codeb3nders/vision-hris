import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateAssetEndpoint } from 'apis/assets';

const initialState: any = {
    data: null,
    status: 'idle',
    error: null,
};


export const updateAsset: any = createAsyncThunk(
    'asset/update',
    async (data: { params: any; access_token: string }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            return await updateAssetEndpoint(data.params, config);
        } catch (err: any) {
            console.error('ERROR in updateAsset', err);
            return err;
        }
    }
);

export const updateAssetSlice = createSlice({
    name: 'asset-update',
    initialState,
    reducers: {
        resetUpdate: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateAsset.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAsset.fulfilled, (state, action) => {
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
            .addCase(updateAsset.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getAssetUpdateStatus = (state: any) => state.updatedAsset.status;
export const getAssetError = (state: any) => state.updatedAsset.error;
export const { resetUpdate } = updateAssetSlice.actions;

export default updateAssetSlice.reducer;
