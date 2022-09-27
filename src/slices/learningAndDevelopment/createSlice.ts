import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createLandDEndpoint } from 'apis/learningAndDev';
import { LearningAndDevelopmentI } from 'slices/interfaces/learningAndDevelopmentI';

const initialState: any = {
  createdItem: null,
  status: 'idle',
  error: null,
};

export const createLearningAndDevelopment: any = createAsyncThunk(
  'learningAndDevelopment/create',
  async (data: { body: LearningAndDevelopmentI; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await createLandDEndpoint(data.body, config);
    } catch (err: any) {
      console.error('ERROR in createEmployee', err);
      return err;
    }
  }
);

export const createLearnAndDevSlice = createSlice({
  name: 'LandD-create',
  initialState,
  reducers: {
    resetCreateLandD: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLearningAndDevelopment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createLearningAndDevelopment.fulfilled, (state, action) => {
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
      .addCase(createLearningAndDevelopment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getNewLandD = (state: any) =>
  state.newLearningAndDev.createdItem;
export const getNewLandDStatus = (state: any) => state.newLearningAndDev.status;
export const getNewLandDError = (state: any) => state.newLearningAndDev.error;
export const { resetCreateLandD } = createLearnAndDevSlice.actions;

export default createLearnAndDevSlice.reducer;
