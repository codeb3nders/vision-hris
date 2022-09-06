import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import axios from "axios";
import { URL_LOGIN } from "constants/EndpointPath";
import { LoginI } from "slices/interfaces/employeeI";

const initialState: any = {
    access_token: "",
    userData: null,
    userGroup: "",
    status: 'idle',
    error: null,
    isLoggedIn: false
};

export const authAction: any = createAsyncThunk(
    "auth/login",
    async (body: LoginI) => {
        try {
            const response = await axios.post(URL_LOGIN, body);
            return { ...response.data };
        } catch (error: any) {
            return error;
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            return { ...state, isLoggedIn: action.payload };
        },
        setUserGroup: (state, action) => {
            return { ...state, userGroup: action.payload };
        },
        clearAuthData: () => {
            storage.removeItem('persist:root')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(authAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (action.payload.access_token) {
                    state.access_token = action.payload.access_token;
                    state.userData = action.payload.userInfo;
                    state.userGroup = action.payload.userInfo.userGroup;
                }
            })
            .addCase(authAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    },
});

export const authStore = (state: any) => state.userAccess;
export const { setIsLoggedIn, clearAuthData, setUserGroup } = authSlice.actions;

export default authSlice.reducer;
