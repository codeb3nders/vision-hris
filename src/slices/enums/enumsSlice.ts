import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEnumEndpoint } from "apis/enums";

const initialState: any = {
    enumsData: [],
    status: "idle",
    error: null,
};

export const getEnumsAction: any = createAsyncThunk(
    "enums/getEnums",
    async (data: any) => {
        const { access_token, params } = data;
        try {
            const config = {
                headers: { Authorization: `Bearer ${access_token}` },
            };
            console.log({ data })
            const response = await getEnumEndpoint(config, params);
            return [...response.data];
        } catch (err: any) {
            console.error("ERROR in getEmployees", err);
            return err.message;
        }
    }
);

export const enumsSlice = createSlice({
    name: "enums",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnumsAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getEnumsAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.enumsData = action.payload;
            })
            .addCase(getEnumsAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const enumsStore = (state: any) => state.enums;

export default enumsSlice.reducer;
