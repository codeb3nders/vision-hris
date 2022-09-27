import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateLandDEndpoint } from 'apis/learningAndDev';
import { LearningAndDevelopmentI } from 'slices/interfaces/learningAndDevelopmentI';

const initialState: any = {
    data: null,
    status: 'idle',
    error: null,
};


export const updateLearnAndDev: any = createAsyncThunk(
    'learningAndDevelopment/update',
    async (data: { params: LearningAndDevelopmentI; access_token: string }) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${data.access_token}` },
            };
            return await updateLandDEndpoint(data.params, config);
        } catch (err: any) {
            console.error('ERROR in createEmployee', err);
            return err;
        }
    }
);

export const updateLearnAndDevSlice = createSlice({
    name: 'LandD-update',
    initialState,
    reducers: {
        resetUpdate: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateLearnAndDev.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateLearnAndDev.fulfilled, (state, action) => {
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
            .addCase(updateLearnAndDev.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getLearnAndDevUpdateStatus = (state: any) => state.updatedLearnAndDev.status;
export const getLearnAndDevUpdateError = (state: any) => state.updatedLearnAndDev.error;
export const { resetUpdate } = updateLearnAndDevSlice.actions;

export default updateLearnAndDevSlice.reducer;
