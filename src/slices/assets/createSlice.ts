import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAssetEndpoint } from 'apis/assets';

const initialState: any = {
  createdItem: null,
  status: 'idle',
  error: null,
};

export const createAssetAction: any = createAsyncThunk(
  'assets/create',
  async (data: { body: any; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await createAssetEndpoint(data.body, config);
    } catch (err: any) {
      console.error('ERROR in createAssetAction', err);
      return err;
    }
  }
);

export const createAssetsSlice = createSlice({
  name: 'assets-create',
  initialState,
  reducers: {
    resetCreateLandD: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAssetAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAssetAction.fulfilled, (state, action) => {
        console.log({ action });
        if (action.payload.response) {
          const { status, data } = action.payload.response;
          state.status = 'failed';
          state.error = data.error;
        } else {
          state.status = 'succeeded';
          state.createdItem = action.payload.data;
        }
      })
      .addCase(createAssetAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getNewAsset = (state: any) =>
  state.newAsset.createdItem;
export const getNewAssetStatus = (state: any) => state.newAsset.status;
export const getNewAssetError = (state: any) => state.newAsset.error;
export const { resetCreateLandD } = createAssetsSlice.actions;

export default createAssetsSlice.reducer;
