import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteAssetEndpoint } from 'apis/assets';

const initialState: any = {
    data: null,
    status: 'idle',
    error: null,
};


export const deleteAssetAction: any = createAsyncThunk(
  'asset/delete',
  async (data: { id: string; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await deleteAssetEndpoint(data.id, config);
    } catch (err: any) {
      console.error('ERROR in deleteAssetAction', err);
      return err;
    }
  }
);

export const deleteAssetSlice = createSlice({
    name: 'asset-delete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAssetAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteAssetAction.fulfilled, (state, action) => {
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
            .addCase(deleteAssetAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getAssetDeleteStatus = (state: any) => state.deleteAsset.status;
export const getAssetDeleteError = (state: any) => state.deleteAsset.error;

export default deleteAssetSlice.reducer;
