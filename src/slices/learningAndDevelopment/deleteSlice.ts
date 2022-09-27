import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteLandDEndpoint } from 'apis/learningAndDev';
import { LearningAndDevelopmentI } from 'slices/interfaces/learningAndDevelopmentI';

const initialState: any = {
    data: null,
    status: 'idle',
    error: null,
};


export const deleteLearningAndDevelopment: any = createAsyncThunk(
  'learningAndDevelopment/delete',
  async (data: { id: string; access_token: string }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${data.access_token}` },
      };
      return await deleteLandDEndpoint(data.id, config);
    } catch (err: any) {
      console.error('ERROR in deleteLearningAndDevelopment', err);
      return err;
    }
  }
);

export const deleteLearnAndDevSlice = createSlice({
    name: 'LandD-delete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteLearningAndDevelopment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteLearningAndDevelopment.fulfilled, (state, action) => {
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
            .addCase(deleteLearningAndDevelopment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getLearnAndDevDeleteStatus = (state: any) => state.deleteLearnAndDev.status;
export const getLearnAndDevDeleteError = (state: any) => state.deleteLearnAndDev.error;

export default deleteLearnAndDevSlice.reducer;
